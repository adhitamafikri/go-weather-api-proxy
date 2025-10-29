include .env

default:
	echo "The Go Weather API Proxy"

.PHONY: up
up:
	docker compose up -d --build

.PHONY: down
down:
	docker compose down

.PHONY: redis-cli
redis-cli:
	docker compose exec -it redis redis-cli -a ${REDIS_PASSWORD}

.PHONY: redis-logs
redis-logs:
	docker compose logs -f redis

