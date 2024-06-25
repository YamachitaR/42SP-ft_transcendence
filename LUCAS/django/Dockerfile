FROM python:3.9-slim

WORKDIR /bk_django

COPY . /bk_django/

RUN apt update && apt install -y netcat-openbsd
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN python manage.py collectstatic --noinput
RUN chmod +x waitPostgres.sh

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=web.settings

CMD ["./waitPostgres.sh", "postgres", "uvicorn", "web.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
