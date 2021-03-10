import pymysql
from flask import Flask
from flask import jsonify
from flask import flash, request
from flaskext.mysql import MySQL


app = Flask(__name__)

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'sealyoulater'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/photography', methods=['GET'])
def photography():

    base = "SELECT * FROM photography "

    # quries for the entry with the spcified id
    photo_id = request.args.get('photo_id')

    # if random is specified with any value, it will get up to a limit of random posts
    random = request.args.get('random')

    # argument for specifying whether to order posts in DESC or ASC order
    time = request.args.get('time')

    page = request.args.get('page')

    # limit on number of posts to be queried for
    # 20 is temporary default limit if non is specified
    limit = 9 if not request.args.get(
        'limit') else int(request.args.get('limit'))

    # offset number for the query. Ex. paging
    if page:
        response = jsonify(getPage(linkBase="/photography/photos",
                                   limit=limit, page=int(page)))
        response.status_code = 200
        return response

    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        if photo_id:
            clause = "WHERE photo_id = %s ;"
            cursor.execute(base+clause, (photo_id,))
        elif random:
            clause = "ORDER BY RAND() LIMIT %s ;"
            cursor.execute(base+clause, (limit,))
        elif time:
            if time == "old":
                clause = "ORDER BY photo_id ASC LIMIT %s ;"
            else:
                clause = "ORDER BY photo_id DESC LIMIT %s ;"
                cursor.execute(base+clause, (limit,))
        else:
            clause = "LIMIT %s OFFSET %s ;"
            cursor.execute(base+clause, (limit, offset,))

        print(cursor._last_executed)
        photos = cursor.fetchall()

        total = getTotal("photography", "photo_id")

        response = jsonify({
            "data": photos,
            "total": total,
        })
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# Helps function to get the count and return it
def getTotal(table, column="*"):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        query = f"SELECT COUNT({column}) FROM {table};"
        cursor.execute(query)
        count = cursor.fetchone()
        print(cursor._last_executed)
        return count[0]
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


def getPage(linkBase, limit, page):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        offset = (page-1) * 9
        query = "SELECT * FROM photography LIMIT %s OFFSET %s ;"
        cursor.execute(query, (limit, offset,))

        print(cursor._last_executed)
        photos = cursor.fetchall()

        total = getTotal("photography", "photo_id")
        finalPage = int(total / limit) + 1

        links = {
            "first": f"{linkBase}?page=0",
            "prev": f"{linkBase}?page={ 0 if not page else page-1 }",
            "current": f"{linkBase}?page={page}",
            "next": f"{linkBase}?page={ page if page == finalPage else page+1 }",
            "last": f"{linkBase}?page={finalPage}",
        }

        response = {
            "data": photos,
            "total_rows": total,
            "count": len(photos),
            "current_page": page,
            "total_pages": finalPage,
        }
        return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
