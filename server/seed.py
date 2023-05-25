#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import time, date, datetime
from sqlalchemy import Date, Time

# Local imports
from app import app
from models import db, User, Membership, Event, Signup, Payment, Session
import stripe

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Dropping tables...")
        db.session.query(User).delete()
        db.session.query(Membership).delete()
        db.session.query(Event).delete()
        db.session.query(Signup).delete()
        db.session.query(Session).delete()
        db.session.commit()
        print("Generating user profiles...")
        guest = User(
            first_name="Guest",
            last_name="Account",
            email="guest@guest.com",
            password_hash="password",
            phone_number=1231231234,
            address="123 Guest Street",
            city="Reno",
            state="Nevada",
            zipcode=12345,
            date_of_birth="2000-01-01",
            emergency_contact_name="Guest Parent",
            emergency_contact_phone_number=1231231234,
            membership_id=1,
            waiver=False
        )
        admin = User(
            first_name="Admin",
            last_name="Account",
            email="admin@admin.com",
            password_hash="password",
            phone_number=1231231234,
            address="123 Admin Street",
            city="Reno",
            state="Nevada",
            zipcode=12345,
            date_of_birth="2000-01-01",
            emergency_contact_name="Admin Parent",
            emergency_contact_phone_number=1231231234,
            waiver=True,
            admin=True
        )
        db.session.add_all([guest, admin])
        db.session.commit()
        for i in range(25):
            phone_number = fake.random_number(digits=10)
            while len(str(phone_number)) < 10:
                phone_number = int("1" + str(phone_number))
            second_phone_number = fake.random_number(digits=10)
            while len(str(second_phone_number)) < 10:
                second_phone_number = int("1" + str(second_phone_number))
            zipcode = int(fake.zipcode())
            while len(str(zipcode)) < 5:
                zipcode = int("1" + str(zipcode))
            new_user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password_hash="password",
                phone_number=phone_number,
                address=fake.street_address(),
                city=fake.city(),
                state=fake.state(),
                zipcode=int(zipcode),
                date_of_birth=fake.date_of_birth(),
                emergency_contact_name=fake.name(),
                emergency_contact_phone_number=second_phone_number,
                waiver=fake.boolean()
            )
            db.session.add(new_user)
            db.session.commit()
        
        print("Generating memberships...")

        guest = Membership(name="Guest", price=0, description="Guest account.  No membership included.", type="Guest", subtype="Guest")

        monthly_membership = Membership(name="Monthly Membership", price=66, description="Unlimited facility access, discounts on classes and merchandise, and more! Automatically renews on the first of each month.", type="Member", subtype="Monthly")
        annual_membership = Membership(name="Annual Membership", price=699, description="All of the same perks as the monthly membership, but with a month and a half's worth of savings!", type="Member", subtype="Annual Prepaid")
        one_month_prepaid = Membership(name="One Month Prepaid Membership", price=80, description="30 day long membership.  Can be purchased as many times as one likes.", type="Member", subtype="Prepaid")
        six_month_prepaid = Membership(name="Six Month Prepaid Membership", price=375, description="Six month long membership.  Can be purchased as many times as one likes.", type="Member", subtype="Prepaid")

        ten_punch_card = Membership(name="Ten Punch Card", price=170, description="Save $30 by purchasing this punch card, with no expiration date.", type="Punch Card", subtype="Punch Card")

        db.session.add_all([guest, monthly_membership, annual_membership, one_month_prepaid, six_month_prepaid, ten_punch_card])
        db.session.commit()

        print("Generating events...")
        belay_lesson = Event(name="Top Rope Belay Lesson", price=15, capacity=4, category="Climbing", hours=1, minutes=0, description="One hour class that teaches basic top rope belay safety skills. Without prior experience this class is required to climb in the roped section of the gym.  Free for members.")


        lead_belay_lesson = Event(name="Lead Belay Lesson", price=100, category="Climbing", capacity=4, hours=4, minutes=0, description="Learn how to lead belay and lead climb in this 4 hour course!")
        beginner_yoga = Event(name="Beginner Yoga Event", price=15, category="Yoga", capacity=20, hours=1, minutes=0, description="Entry level yoga class for beginners or more experienced yogis who want a more mellow session.  Free for members.")
        intermediate_yoga = Event(name="Intemediate Yoga Event", price=15, category="Yoga", capacity=20, hours=1, minutes=0, description="Intemediate level yoga class for slightly to well experienced yogis.  Free for members.")
        advanced_yoga = Event(name="Advanced Yoga Event", category="Yoga", capacity=20, hours=1, minutes=0, price=15, description="Advanced level yoga class for experienced yogis.  Beginners not advised.  Free for members.")

        core_class = Event(name="Core Event", price=10, category="Fitness", capacity=20, hours=0, minutes=30, description="30 minute long intense core workout lead by experienced instructor.  Get ready to feel the burn!")
        
        flexibility_class = Event(name="Flexibility Friday", price=10, category="Fitness", capacity=20, hours=0, minutes=30, description="Work on your flexibility regardless of your current level!")
        db.session.add_all([belay_lesson, lead_belay_lesson, beginner_yoga, intermediate_yoga, advanced_yoga, core_class, flexibility_class])

        print("Generating signups...")

        for i in range(500):
            new_signup = Signup(
                user_id=randint(1, 100),
                session_id=randint(1, 7),
                paid=fake.boolean()
            )
            db.session.add(new_signup)
            db.session.commit()

        print("Generating sessions...")
        date_value = datetime(2023, 5, 23)
        time_value = time(14, 30)
        date_value2 = datetime(2023, 5, 24)
        time_value2 = time(10, 00)
        date_value3 = datetime(2023, 5, 25)
        time_value3 = time(18, 00)
        print(time_value)
        session1 = Session(date=date_value, time=time_value, event_id=1)
        session2 = Session(date=date_value, time=time_value, event_id=2)
        session3 = Session(date=date_value3, time=time_value3, event_id=3)
        session4 = Session(date=date_value3, time=time_value3, event_id=4)
        session5 = Session(date=date_value2, time=time_value2, event_id=5)
        session6 = Session(date=date_value2, time=time_value2, event_id=6)
        session7 = Session(date=date_value, time=time_value, event_id=7)
        db.session.add_all([session1, session2, session3, session4, session5, session6, session7])
        db.session.commit()