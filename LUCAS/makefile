
NAME = Transcendence


ifeq ($(OS),Windows_NT)
    DOCKER = docker compose
    SDOCKER = docker
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        DOCKER = sudo docker-compose
        SDOCKER = sudo docker
    else ifeq ($(UNAME_S),Darwin)
        DOCKER = sudo docker-compose
    endif
endif


all: up
# message in terminal ************ #
	@echo "\033[1;32m"
	@echo "    $(NAME) End Server ✓"
	@echo "\033[0m"
	@echo "\033[0;33m    thank you $(NAME) by lucasmar, esilva-s and ryoshio- 42sp \033[0m"

build:
	$(DOCKER) build

up:
	$(DOCKER) up --build -d
	$(DOCKER) logs -f django

logDjango:
	$(DOCKER) logs -f django
logPostgres:
	$(DOCKER) logs -f postgres
logNginx:
	$(DOCKER) logs -f nginx
logRedis:
	$(DOCKER) logs -f nginx

inpostgres:
	$(SDOCKER) exec -it c_postgres psql -U admin -d pong

indjango:
	$(SDOCKER) exec -it c_django bash

innginx:
	$(SDOCKER) exec -it c_nginx bash

down:
	$(DOCKER) down

clean:
	$(SDOCKER) rm -f $$(docker ps -a -q) || true
	$(DOCKER) down --volumes --remove-orphans
	$(SDOCKER) volume rm -f $$(docker volume ls -q) || true
	$(SDOCKER) image prune -a -f
	$(SDOCKER) network prune -f
	$(SDOCKER) container prune -f
	$(SDOCKER) system prune --all --force --volumes

stop:
	$(DOCKER) stop

collectstatic:
	$(DOCKER) -f docker-compose.yml exec django python manage.py collectstatic --noinput

atualizar:
	$(DOCKER) up --build

fclean: down clean

re: fclean all

.PHONY: all clean fclean re
