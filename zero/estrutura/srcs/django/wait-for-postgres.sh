#!/bin/bash
python manage.py collectstatic --noinput

if [ "$DATABASE_HOST" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations mainApp
python manage.py migrate

