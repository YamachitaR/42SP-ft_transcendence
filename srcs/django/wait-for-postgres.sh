#!/bin/bash
python manage.py collectstatic --noinput

if [ "$DB_HOST" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations mainApp
python manage.py migrate

exec "$@"