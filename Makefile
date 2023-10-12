## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
## Usage:
##   - make prod         : Run the app in production mode
##   - make develop      : Run the app locally
##   - make install      : Install node module dependencies
##   - make test         : Run tests
##   - make docker       : Run the app in a Docker container
##   - make deploy       : Build and deploy to GitHub Pages
##   - make help         : Show available commands and descriptions
##

.PHONY:prod
prod:
	npm run build:ssr
	npm run serve:ssr

.PHONY:develop
develop:
	npm run start

.PHONY:install
install:
	npm ci

.PHONY:test
test:
	npm test

.PHONY:docker
docker:
	docker-compose up --build

.PHONY:deploy
deploy:
	bash ./build-and-deploy.sh

.PHONY:help
help:
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)