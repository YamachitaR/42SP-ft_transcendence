#!/bin/bash

# Parar todos os containers
sudo docker stop $(docker ps -a -q)

# Remover todos os containers
sudo docker rm $(docker ps -a -q)

# Remover todas as imagens
sudo docker rmi $(docker images -q)

# Remover todos os volumes
sudo docker volume rm $(docker volume ls -q)

# Remover todas as networks
sudo docker network rm $(docker network ls -q)

# Limpar dados pendentes
sudo docker system prune -a --volumes -f
