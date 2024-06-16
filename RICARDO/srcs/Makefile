

# Variáveis
DOCKER_COMPOSE = sudo docker-compose
PROJECT_DIR = docker-compose.yml

# Comandos
up:
	$(DOCKER_COMPOSE)  --file=$(PROJECT_DIR) up --build --detach

up-detached:
	$(DOCKER_COMPOSE) --file=$(PROJECT_DIR) up --build --detach

down:
	-$(DOCKER_COMPOSE) --file=$(PROJECT_DIR) down --rmi all --remove-orphans -v

logs:
	$(DOCKER_COMPOSE) --file=$(PROJECT_DIR) logs

start:
	$(DOCKER_COMPOSE) --file=$(PROJECT_DIR) start

stop:
	$(DOCKER_COMPOSE) --file=$(PROJECT_DIR)  stop

ls:
	sudo docker ps -a

clean: down

fclean: down
	# Parar todos os containers
	-sudo docker stop $(docker ps -a -q)

	# Remover todos os containers
	-sudo docker rm $(docker ps -a -q)

	# Remover todas as imagens
	-sudo docker rmi $(docker images -q)

	# Remover todos os volumes
	-sudo docker volume rm $(docker volume ls -q)

	# Remover todas as networks
	-sudo docker network rm $(docker network ls -q)

	# Limpar dados pendentes
	-sudo docker system prune -a --volumes -f





all: up



# Limpa os volumes do Docker
clean-volume:
	$(DOCKER_COMPOSE) down -v

clean: down
	clean-volume



# Ajuda
help:
	@echo "Comandos disponíveis:"
	@echo "  make up          - Inicia os containers com build"
	@echo "  make up-detached - Inicia os containers em segundo plano com build"
	@echo "  make down        - Para e remove os containers"
	@echo "  make logs        - Exibe os logs dos containers"
	@echo "  make ps          - Mostra o status dos containers"
	@echo "  make fclean	  - Limpa tudo!


re: fclean all

.PHONY: all run up down start stop ls clean fclean re
