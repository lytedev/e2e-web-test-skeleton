# Setup

See `docs/setup.md`.

_Note_: In the setup, you clone this repo into the `tests` foler in the root of
your project. Note that this repo also contains a `tests` directory. This means
that, from the perspective of your project's root, `tests/tests/e2e/tests` is
a directory. I'm sorry if this is confusing and am open to feedback on any
aspect of this project. The reasoning is that the `$PROJECT_ROOT/tests` repo
directory may contain more than just your e2e tests, so the ability to add
a `tests/tests/unit` directory for unit tests or whatever. It may be more
desirable to omit the `$PROJECT_ROOT/tests` directory and just have the `e2e`
folder be in the root of the tests repo. Such that `tests/tests/e2e/tests`
would just be `tests/e2e/tests`, which may be better.

## TL;DR?

// TODO: add env.config.js

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 	# Install Homebrew
    brew install nodejs 																		# Install NodeJS
	npm install -g mocha gulp phantomjs															# Install mocha, gulp, and phantomjs
	cd $YOUR_PROJECT
	git clone ssh://vc.emfluence.com/git/test.suite.base.2015.mocha tests						# Clone the e2e testing repo
	rm -rf tests/.git																			# Don't need VCS info
	cd tests
	npm install																					# Install testing dependencies
	$EDITOR config.js																			# Configure testing environment
	gulp																						# Run tests

# Under the Hood

See `under_the_hood.md`.

# FAQ

#### I want to test with Chrome!

See `docs/chromedriver.md`.
