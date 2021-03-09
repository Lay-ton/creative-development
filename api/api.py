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

    # limit on number of posts to be queried for
    # 20 is temporary default limit if non is specified
    limit = 20 if not request.args.get(
        'limit') else int(request.args.get('limit'))

    # offset number for the query. Ex. paging
    offset = 0 if not request.args.get(
        'offset') else int(request.args.get('offset'))

    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        if photo_id:
            base += "WHERE photo_id = %s ;"
            cursor.execute(base, (photo_id,))
        else:
            if random:
                base += "ORDER BY RAND() LIMIT %s ;"
                cursor.execute(base, (limit,))
            elif time:
                if time == "old":
                    base += "ORDER BY photo_id ASC LIMIT %s ;"
                else:
                    base += "ORDER BY photo_id DESC LIMIT %s ;"
                cursor.execute(base, (limit,))
            else:
                base += "LIMIT %s OFFSET %s"
                cursor.execute(base, (limit, offset,))
        print(cursor._last_executed)
        fetchrows = cursor.fetchall()
        respone = jsonify({"photos": fetchrows})
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
