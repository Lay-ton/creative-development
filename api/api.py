import pymysql
from flask import Flask
from flask import jsonify
from flask import flash, request
from flaskext.mysql import MySQL
from flask_restplus import Api, Resource


app = Flask(__name__)
api = Api(app=app)

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'sealyoulater'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@api.route('/photography')
class PhotographyList(Resource):
    def get(self):
        """
        Return all photo entries

        Query Arguments:
        limit: defaults to 100
        offset: defaults to 0
        """
        limit = int(request.args.get('limit')
                    ) if request.args.get('limit') else 100
        offset = int(request.args.get('offset')
                     ) if request.args.get('offset') else 0

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            clause = "SELECT * FROM photography LIMIT %s OFFSET %s;"
            cursor.execute(clause, (limit, offset))
            print(cursor._last_executed)
            photos = cursor.fetchall()
            total = getTotal("photography", "photo_id")
            print(photos)
            response = jsonify({
                "data": photos,
                "total": total,
                "count": len(photos),
            })
            response.status_code = 200
            return response
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@api.route('/photography/sorted/<string:order>')
class PhotographyList(Resource):
    def get(self, order):
        """
        Return all photo entries in ASC or DESC order

        Query Arguments:
        limit: defaults to 100
        offset: defaults to 0
        """
        limit = int(request.args.get('limit')
                    ) if request.args.get('limit') else 100
        offset = int(request.args.get('offset')
                     ) if request.args.get('offset') else 0

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            if order == "ASC":
                clause = "SELECT * FROM photography ORDER BY photo_id ASC LIMIT %s OFFSET %s;"
            else:
                clause = "SELECT * FROM photography ORDER BY photo_id DESC LIMIT %s OFFSET %s;"
            cursor.execute(clause, (limit, offset))
            print(cursor._last_executed)
            photos = cursor.fetchall()
            total = getTotal("photography", "photo_id")
            print(photos)
            response = jsonify({
                "data": photos,
                "total": total,
                "count": len(photos),
            })
            response.status_code = 200
            return response
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@api.route('/photography/random')
class PhotographyList(Resource):
    def get(self):
        """
        Return all photo entries in random order

        Query Arguments:
        limit: defaults to 100
        offset: defaults to 0
        """
        limit = int(request.args.get('limit')
                    ) if request.args.get('limit') else 100
        offset = int(request.args.get('offset')
                     ) if request.args.get('offset') else 0

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            clause = "SELECT * FROM photography ORDER BY RAND() LIMIT %s OFFSET %s;"
            cursor.execute(clause, (limit, offset))
            print(cursor._last_executed)
            photos = cursor.fetchall()
            total = getTotal("photography", "photo_id")
            print(photos)
            response = jsonify({
                "data": photos,
                "total": total,
                "count": len(photos),
            })
            response.status_code = 200
            return response
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@api.route('/photography/poster/<int:id>')
class Photography(Resource):
    def get(self, id):
        """
        Display a photos details
        """
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            clause = "SELECT * FROM photography WHERE photo_id = %s;"
            cursor.execute(clause, (id,))
            print(cursor._last_executed)
            photos = cursor.fetchone()
            total = getTotal("photography", "photo_id")
            response = jsonify({
                "data": photos,
            })
            response.status_code = 200
            return response
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@api.route('/photography/page/<int:pageNum>')
class PhotographyList(Resource):
    def get(self, pageNum):
        """
        Return a page and metadata

        Query Arguments:
        limit: defaults to 9
        """
        limit = int(request.args.get('limit')
                    ) if request.args.get('limit') else 9
        offset = (pageNum - 1) * limit

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            clause = "SELECT * FROM photography LIMIT %s OFFSET %s;"
            cursor.execute(clause, (limit, offset))
            print(cursor._last_executed)
            photos = cursor.fetchall()
            total = getTotal("photography", "photo_id")
            finalPage = int(total / limit) + 1
            print(photos)
            response = jsonify({
                "data": photos,
                "total": total,
                "count": len(photos),
                "current_page": pageNum,
                "total_pages": finalPage,
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
