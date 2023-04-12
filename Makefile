## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
##

.PHONY:run
run: ## run the app in production mode
##
	npm run build:ssr
	npm run serve:ssr

.PHONY:local
local: ## run the app locally
##
	npm run start

.PHONY:install
install: ## install node modules dependencies
##
	npm ci

.PHONY:test
test: ## run tests
##
	npm test

.PHONY:docker
docker: ## run the app inside docker
##
	docker-compose up --build

.PHONY:deploy
deploy: ## run the app to GH page
##
	bash ./build-and-deploy.sh

.PHONY:help
help: ## Show this help
##
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)