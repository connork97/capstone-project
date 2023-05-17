#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import request, make_response, session
from flask_cors import CORS
# Local imports
from config import app, db, api
from models import User, Membership, Class, Signup, Payment

CORS(app)
# Views go here!

@app.route('/')
def home():
    return ''

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':

        all_users_dict = [user.to_dict() for user in User.query.all()]
        
        if all_users_dict:
            response = make_response(all_users_dict, 200)
        
        else:
            response = make_response({"error": "Users not found."}, 404)
    
    if request.method == 'POST':

        try:
            form_data = request.get_json()
            new_user = User(
                first_name=form_data['firstName'],
                last_name=form_data['lastName'],
                email=form_data['email'],
                password_hash=form_data['password'],
                phone_number=int(form_data['phoneNumber']),
                address=form_data['address'],
                city=form_data['city'],
                state=form_data['state'],
                zipcode=int(form_data['zipcode']),
                date_of_birth=form_data['dateOfBirth'],
                emergency_contact_name=form_data['emergencyContactName'],
                emergency_contact_phone_number=int(form_data['emergencyContactPhoneNumber'])
            )
            db.session.add(new_user)
            db.session.commit()
            response = make_response(new_user.to_dict(), 200)
        
        except:
            response = make_response({"error": "Unsuccessful creation of new class"}, 404)

    return response

@app.route('/users/<int:id>', methods=['GET', 'DELETE'])
def user_by_id(id):
    user = User.query.filter(User.id == id).one_or_none()
    if user:
        if request.method == 'GET':
            response = make_response(user.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(user)
                db.session.commit()
                response = make_response({"success": f"User of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"User of id {id} not deleted"}, 404)
    else:
        response = make_response({"error": f"404: User of id {id} not found."})

    return response

        
@app.route('/memberships', methods=['GET', 'POST'])
def memberships():
    if request.method == 'GET':
        all_memberships_dict = [membership.to_dict() for membership in Membership.query.all()]
        if all_memberships_dict:
            response = make_response(all_memberships_dict, 200)
        else:
            response = make_response({"error": "Memberships not found."}, 404)

    if request.method == 'POST':
        try:
            form_data = request.get_json()
            new_membership = Membership(
                name=form_data['name'],
                price=form_data['price'],
                type=form_data['type'],
                subtype=form_data['subtype'],
                description=form_data['description']
            )
            db.session.add(new_membership)
            db.session.commit()
            response = make_response(new_membership.to_dict(), 200)

        except:
            response = make_response({"error": "Unsuccessful creation of new membership."}, 404)

    return response

@app.route('/memberships/<int:id>', methods=['GET', 'DELETE'])
def membership_by_id(id):
    membership = Membership.query.filter(Membership.id == id).one_or_none()
    if membership:
        if request.method == 'GET':
            response = make_response(membership.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(membership)
                db.session.commit()
                response = make_response({"success": f"Membership of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"Membership of id {id} not deleted"}, 404)

    else:
        response = make_response({"error": f"404: Membership of id {id} not found."})

    return response

@app.route('/classes', methods=['GET', 'POST'])
def classes():
    if request.method == 'GET':
        all_classes_dict = [cls.to_dict() for cls in Membership.query.all()]
        if all_classes_dict:
            response = make_response(all_classes_dict, 200)
        else:
            response = make_response({"error": "Classes not found."}, 404)
    
    if request.method == 'POST':
        try:
            form_data = request.get_json()
            new_class = Class(
                name=form_data['name'],
                price=form_data['price'],
                category=form_data['category'],
                capacity=int(form_data['capacity']),
                hours=int(form_data['hours']),
                minutes=int(form_data['minutes']),
                recurring=form_data['recurring'],
                description=form_data['description']
            )
            db.session.add(new_class)
            db.session.commit()
            response = make_response(new_class.to_dict(), 200)

        except:
            response = make_response({"error": "Unsuccessful creation of new class"}, 404)

    return response

@app.route('/classes/<int:id>', methods=['GET', 'DELETE'])
def class_by_id(id):
    one_class = Class.query.filter(Class.id == id).one_or_none()
    if one_class:
        if request.method == 'GET':
            response = make_response(one_class.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(one_class)
                db.session.commit()
                response = make_response({"success": f"Class of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"Class of id {id} not deleted"}, 404)
    else:
        response = make_response({"error": f"404: Class of id {id} not found."})

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
