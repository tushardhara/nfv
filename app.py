'''
NFV project 
'''

import json,collections,os
from bottle import run, route, template, static_file, request, redirect, get, post
import MySQLdb
#######################
# Static file servers #
#######################

ROOTPATH = ''

@route('/assets/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='static/')


@route('/')
def root():
    return template('user.html')

@route('/createuser' , method="POST")
def createuser():
    jsonl = json.loads(json.dumps(request.json))
    print jsonl['email_id']
    # Open database connection
    db = MySQLdb.connect("localhost","root","password","nfv" )

    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    # Prepare SQL query to INSERT a record into the database

    sql = "INSERT INTO NFVI_VIPP_USERS(email_id,user_name,linux_id,chassis_detail) VALUES ('%s','%s','%s','%s')" % (jsonl['email_id'],jsonl['user_name'],jsonl['linux_id'],jsonl['chassis_detail'])
    try:
       # Execute the SQL command
       cursor.execute(sql)
       # Commit your changes in the database
       db.commit()
    except:
       # Rollback in case there is any error
       print "error"
       db.rollback()

    # disconnect from server
    db.close()

@route('/getuser')
def getuser():
    # Open database connection
    db = MySQLdb.connect("localhost","root","password","nfv" )

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = "SELECT * FROM NFVI_VIPP_USERS order by enum_id DESC"
    j=""
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
        objects_list = []
        for row in results:
            d = collections.OrderedDict()
            d['enum_id'] = row[0]
            d['email_id'] = row[1]
            d['user_name'] = row[2]
            d['linux_id'] = row[3]
            d['chassis_detail'] = row[4]
            objects_list.append(d)
        j = json.dumps(objects_list)
    except:
       j = "Error: unable to fecth data"

    # disconnect from server
    db.close()
    return j

@route('/deleteuser' , method="POST")
def deleteuser():
    jsonl = json.loads(json.dumps(request.json))
    # Open database connection
    db = MySQLdb.connect("localhost","root","password","nfv" )

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = "DELETE FROM NFVI_VIPP_USERS WHERE enum_id = %s" % (jsonl['enum_id'])
    j=""
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        print "error"
        db.rollback()

    # disconnect from server
    db.close()

@route('/edituser' , method="POST")
def edituser():
    jsonl = json.loads(json.dumps(request.json))
    print jsonl
    # Open database connection
    db = MySQLdb.connect("localhost","root","password","nfv" )

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = "UPDATE NFVI_VIPP_USERS SET email_id = '%s' , user_name = '%s',linux_id = %s,chassis_detail = '%s' WHERE enum_id = %s" \
    % \
    (jsonl['email_id'],jsonl['user_name'],jsonl['linux_id'],jsonl['chassis_detail'],jsonl['enum_id'])

    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        print "error"
        db.rollback()

    # disconnect from server
    db.close()

def main():
    run(host='0.0.0.0', port=5111, debug=True, reloader=True)

if __name__ == '__main__':
    main()
