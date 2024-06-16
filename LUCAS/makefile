NAME = Transcendence

all: up
# message in terminal ************ #
	@echo "\033[1;32m"
	@echo "	$(NAME) created ✓"
	@echo "\033[0m"
	@echo "\033[0;33m	Welcome to $(NAME) by lucasmar, esilva-s and ryoshio- 42sp \033[0m"
	@echo "\033[0;33m	Try "./foda-se" \033[0m"

build:
	docker compose build

up:
	docker compose up --build -d
	docker compose logs -f nginx

inpostgres:
	docker exec -it c_postgres psql -U admin -d pong

indjango:
	docker exec -it c_django bash

innginx:
	docker exec -it c_nginx bash

down:
	docker compose down

clean:
	docker rm -f $$(docker ps -a -q) || true
	docker volume rm -f $$(docker volume ls -q) || true
	docker system prune --all --force --volumes

stop:
	docker compose stop

atualizar: stop down build up

fclean: down clean

re: fclean all

.PHONY: all clean fclean re
