## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
## Usage:
##   - make local        : Run the app locally
##   - make install      : Install node module dependencies
##   - make test         : Run tests
##   - make help         : Show available commands and descriptions
##

.PHONY:local
local:
	make install
	npm run start

.PHONY:install
install:
	if [ ! -d "./node_modules" ]; then \
		npm ci; \
	else \
		echo "Skipping npm ci."; \
	fi

.PHONY:test
test:
	make install
	npm test

.PHONY:help
help:
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)