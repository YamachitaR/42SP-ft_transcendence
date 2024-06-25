#!/bin/bash

API_URL="http://localhost:8000/api/signup/"  # Altere para o URL correto da sua API de criação de usuários

for i in {1..30}
do
  curl -X POST $API_URL -H "Content-Type: application/json" -d '{
    "email": "user'$i'@example.com",
    "password": "1",
    "username": "user'$i'",
    "first_name": "User'$i'",
    "last_name": "Test"
  }'
  echo "Usuário user$i criado com sucesso!"
done
