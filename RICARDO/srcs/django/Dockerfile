# srcs/django/Dockerfile

FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/
COPY wait-for-postgres.sh /app/wait-for-postgres.sh
RUN chmod +x /app/wait-for-postgres.sh

#RUN python3 manage.py collectstatic --noinput

EXPOSE 8000

CMD ["sh", "/app/wait-for-postgres.sh"]
