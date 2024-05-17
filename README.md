### File setup Guide

clone the project using - git clone https://github.com/MuhammedAnasEP/Patient-Appointment-System/

### Backend Setup Guide

Add virtualenv file using - virtualenv venv
Activate it - source venv/bin/activate

install requrements.txt
using - pip install -r requirements.txt

connect your local database in - backend/core/settings

do migratins -
python manage.py makemigrations
python manage.py migrate

then runserver -

python manage.py runserver

### Front End setup

install packages using -

npm install

run app using -

npm start


