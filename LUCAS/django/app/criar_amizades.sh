#!/bin/bash

API_URL="http://localhost:8000/api/friends/"  # Altere para o URL correto da sua API de criação de amizades

# Obtendo todos os usuários
users=$(curl -X GET http://localhost:8000/api/users/ -H "Content-Type: application/json")

# Convertendo a resposta JSON em uma lista de IDs de usuários
user_ids=$(echo $users | jq -r '.[].id')

# Criando amizades
user_ids_array=($user_ids)
length=${#user_ids_array[@]}

for (( i=0; i<$length; i++ ))
do
  for (( j=i+1; j<$length; j++ ))
  do
    user_id_1=${user_ids_array[$i]}
    user_id_2=${user_ids_array[$j]}

    curl -X POST $API_URL -H "Content-Type: application/json" -d '{
      "user": '$user_id_1',
      "amigo": '$user_id_2',
      "aceita": true
    }'
    echo "Usuário $user_id_1 agora é amigo do usuário $user_id_2"
  done
done
