REPORTER = list
MOCHA_OPTS = --ui bdd -c

db:
	echo Seeding blog-test *****************************************************
	./db/seed.sh

test:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test

start:
	TWITTER_CONSUMER_KEY=582ZIIic4owMICofXsqr2fTVW \
	TWITTER_CONSUMER_SECRET=fv4kruzcSHYNrDyKaUDbpDy7WrYy7gQ57JcNMSnk27dWgRGy4m \
	node  app

.PHONY: test db start
