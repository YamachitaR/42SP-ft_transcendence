NAME = Transcendence
DOCKER = docker compose
#DOCKER = sudo docker-compose


all: up
# message in terminal ************ #
	@echo "\033[1;32m"
	@echo "	$(NAME) End Server ✓"
	@echo "\033[0m"
	@echo "\033[0;33m	thank you $(NAME) by lucasmar, esilva-s and ryoshio- 42sp \033[0m"

build:
	$(DOCKER) build

up:
	$(DOCKER) up --build -d
	$(DOCKER) logs -f nginx

logDjango:
	$(DOCKER) logs -f django
logPostgres:
	$(DOCKER) logs -f postgres
logNginx:
	$(DOCKER) logs -f nginx
logRedis:
	$(DOCKER) logs -f nginx

inpostgres:
	docker exec -it c_postgres psql -U admin -d pong

indjango:
	docker exec -it c_django bash

innginx:
	docker exec -it c_nginx bash

down:
	$(DOCKER) down

clean:
	docker rm -f $$(docker ps -a -q) || true
	$(DOCKER) down --volumes --remove-orphans
	docker volume rm -f $$(docker volume ls -q) || true
	docker image prune -a -f
	docker network prune -f
	docker container prune -f
	docker system prune --all --force --volumes

stop:
	$(DOCKER) stop

collectstatic:
	$(DOCKER) -f docker-compose.yml exec django python manage.py collectstatic --noinput

atualizar:
	docker compose up --build

fclean: down clean

re: fclean all

.PHONY: all clean fclean re
