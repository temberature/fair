#!venv/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, jsonify, abort, make_response, request, url_for, current_app, abort, g
import MySQLdb
from flask_cors import CORS
import json
import os
from hashlib import sha256
from hmac import HMAC
import sys
from sqlalchemy import Column, String, create_engine, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models import Base, User, Agenda, Topic, Vote
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()
reload(sys)
sys.setdefaultencoding('utf-8')

# 初始化数据库连接:
engine = create_engine(
    'mysql+mysqlconnector://root:IhAd@!13965@localhost:3306/fair')
# 创建DBSession类型:
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
app = Flask(__name__)
CORS(app)


def verify_password(username_or_token, password):
    # Try to see if it's a token first
    user_id = User.verify_auth_token(username_or_token)
    if user_id:
        user = session.query(User).filter_by(id=user_id).one()
    else:
        user = session.query(User).filter_by(
            username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


courses = [
    {
        'id': 1,
        'type': 0,
        'name': u'《从柏拉图到维尼》',
        'address': u'1901 Cafe地安门店',
        'startDate': 1512777600000,
        'endDate': -1,
        'quota': 30,
        'fee': 0,
        'detail': '',
        'period': 0,
        'cover': 'https://img3.doubanio.com/lpic/s29448286.jpg'
    }
]


@app.route('/fair/api/v1.0/agendas/<int:id>', methods=['GET'])
def get_agenda(id):
    print id, Agenda
    user_id = 115
    agenda = session.query(Agenda).filter_by(id=id).one()
    print agenda.text.encode('utf-8')
    topics = []
    topicsObj = session.query(Topic).filter_by(agenda=id).all()
    for topic in topicsObj:
        vote = session.query(Vote).filter_by(topic = topic.id, user = user_id).one_or_none()
        if (vote and vote.voted == 1):
            voted = 1
        else:
            voted = 0         
        topics.append({
            'id': topic.id,
            'text': topic.text,
            'voteNumber': topic.voteNumber,
            'voted': voted
        })
    return jsonify({
        "data": {
            "id": agenda.id,
            "text": agenda.text,
            "topics": topics,
            "totalVoteNumber": agenda.voteNumber
        }
    })


@app.route('/fair/api/v1.0/agendas', methods=['POST'])
def add_agenda():
    return jsonify({
        "data": {
            "id": "123"
        }
    })


@app.route('/fair/api/v1.0/users', methods=['POST'])
def sign():
    type = request.json.get('type')
    username = request.json.get('username')
    password = request.json.get('password')
    print request.json, session.query(
        User).filter_by(username=username).first()
    if username is None or password is None:
        print "missing arguments"
        abort(400)
    if (type == 0):
        if session.query(User).filter_by(username=username).first() is not None:
            print "existing user"
            user = session.query(User).filter_by(username=username).first()
            return jsonify({'message': 'user already exists'}), 200, {'Location': url_for('get_user', id=user.id, _external=True)}

        user = User(username=username)
        user.hash_password(password)
        session.add(user)
        session.commit()
        return jsonify({'username': user.username}), 201, {'Location': url_for('get_user', id=user.id, _external=True)}
    elif (type == 1):
        if (verify_password(username, password)):
            token = g.user.generate_auth_token()
            return jsonify({'token': token.decode('ascii')})


@app.route('/fair/api/v1.0/users/<int:id>')
def get_user(id):
    user = session.query(User).filter_by(id=id).one()
    if not user:
        abort(400)
    return jsonify({'username': user.username})


@app.route('/fair/api/v1.0/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})

@app.route('/fair/api/v1.0/topics/<int:topic_id>', methods=['POST'])
def update_topic(topic_id):
    user_id = User.verify_auth_token(request.args.get('token'))
    if not user_id:
        return 'no access'
    topic = session.query(Topic).filter_by(id = topic_id).one_or_none()
    if not topic:
        return ''
    vote = session.query(Vote).filter_by(topic = topic_id, user = user_id).one_or_none()
    if (vote):   
        if (vote.voted ==0):
            vote.voted = 1
            
        elif (vote.voted == 1):
            vote.voted = 0
        else:
            return 'error'
    else:
        vote = Vote(topic = topic_id, user = user_id, voted = 1)
        session.merge(vote)
    session.commit()
    return jsonify({
        "retcode": 200,
        "data": {
            "id": topic_id,
            "voted": vote.voted
        }
    })

@app.route('/fair/api/v1.0/topics', methods=['POST'])
def add_topic():
    user_id = 115
    if not user_id:
        return 'no access'
    text = request.json.get('text')
    agenda_id = request.json.get('agenda_id')
    topic = session.query(Topic).filter_by(text = text).one_or_none()
    if topic:
        return 'repeat'
    else:
        topic = Topic(agenda = agenda_id, text = text, voteNumber = 0)
        session.merge(topic)
        session.commit()
        return jsonify({
            "retcode": 200,
            "data": {
                "id": topic.id
            }
        })
@app.route('/fair/api/v1.0/votes', methods=['POST'])
def add_vote():
    user_id = 115
    if not user_id:
        return 'no access'
    topic_id = request.json.get('topic_id')
    if not topic_id:
        return 'missing arguments'
    topic = session.query(Topic).filter_by(id = topic_id).one_or_none()
    if not topic:
        return 'topic not found'
    agenda = session.query(Agenda).filter_by(id = topic.agenda).one_or_none()
    vote = session.query(Vote).filter_by(topic = topic_id, user = user_id).one_or_none()
    if (vote):   
        if (vote.voted ==0):
            vote.voted = 1
            topic.voteNumber = topic.voteNumber + 1
            agenda.voteNumber = agenda.voteNumber + 1
        elif (vote.voted == 1):
            vote.voted = 0
            topic.voteNumber = topic.voteNumber - 1
            agenda.voteNumber = agenda.voteNumber - 1
        else:
            return 'error'
    else:
        vote = Vote(topic = topic_id, user = user_id, voted = 1)
        topic.voteNumber = topic.voteNumber + 1
        agenda.voteNumber = agenda.voteNumber + 1
        session.merge(vote)
    session.commit()
    return jsonify({
        "retcode": 200,
        "data": {
            "id": topic_id,
            "voted": vote.voted
        }
    })


@app.route('/fair/api/v1.0/courses', methods=['GET'])
def get_courses():
    return jsonify({
        'data': {
            'courses': map(make_public_course, courses)
        }
    })


@app.route('/fair/api/v1.0/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = filter(lambda t: t['id'] == course_id, courses)
    if len(course) == 0:
        abort(404)
    return jsonify({'course': course[0]})


@app.route('/fair/api/v1.0/courses', methods=['POST'])
def create_course():
    if not request.json or not 'title' in request.json:
        abort(400)
    course = {
        'id': courses[-1]['id'] + 1,
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'done': False
    }
    courses.append(course)
    return jsonify({'course': course}), 201


@app.route('/fair/api/v1.0/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = filter(lambda t: t['id'] == course_id, courses)
    if len(course) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'title' in request.json and type(request.json['title']) != unicode:
        abort(400)
    if 'description' in request.json and type(request.json['description']) is not unicode:
        abort(400)
    if 'done' in request.json and type(request.json['done']) is not bool:
        abort(400)
    course[0]['title'] = request.json.get('title', course[0]['title'])
    course[0]['description'] = request.json.get(
        'description', course[0]['description'])
    course[0]['done'] = request.json.get('done', course[0]['done'])
    return jsonify({'course': course[0]})


@app.route('/fair/api/v1.0/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = filter(lambda t: t['id'] == course_id, courses)
    if len(course) == 0:
        abort(404)
    courses.remove(course[0])
    return jsonify({'result': True})


def make_public_course(course):
    new_course = {}
    for field in course:
        if field == 'id':
            new_course['uri'] = url_for(
                'get_course', course_id=course['id'], _external=True)
        else:
            new_course[field] = course[field]
    return new_course


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
