
PATH_COMPOSE = ./srcs/docker-compose.yml


all: build

build:
	sudo docker-compose --file=$(PATH_COMPOSE) up --build --detach 
	sudo grep $(LOGIN).42.fr /etc/hosts || echo "127.0.0.1 $(LOGIN).42.fr" | sudo tee -a /etc/hosts

up:
	docker-compose --file=$(PATH_COMPOSE) up --build --detach 

down:
	docker-compose --file=$(PATH_COMPOSE) down --rmi all --remove-orphans -v

start:
	docker-compose --file=$(PATH_COMPOSE) start

stop:
	docker-compose --file=$(PATH_COMPOSE) stop

ls:
	docker ps

clean: down

fclean: clean
	sudo rm -rf $(PATH_VOLUME)


clean-before:
	docker ps -a -q --filter "status=exited" | xargs -r docker rm
	docker images -q -f "dangling=true" | xargs -r docker rmi
	
	
re: fclean all


.PHONY: all run up down start stop ls clean fclean re 