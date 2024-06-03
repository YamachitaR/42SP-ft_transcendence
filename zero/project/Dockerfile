# Dockerfile

# Usando imagem base oficial do Python
FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1


# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo de requisitos para o contêiner
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o conteúdo da pasta atual para o contêiner
COPY . .

# Coleta os arquivos estáticos
RUN python backend/manage.py collectstatic --noinput

# Expõe a porta que o Django usará
EXPOSE 8000

# Define o comando para rodar a aplicação
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
