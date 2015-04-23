# Setup

First, let's walk through getting to the point where you're capable of running
the test suites.

## Dependencies

We're going to use Homebrew to install NodeJS and its package manager. However,
you may install NodeJS and NPM in whatever way works best for you. 

Node's package manager `npm` is pretty fantastic and gives us the
quickest/easiest access to the components that make up our E2E test suite
system.

    brew install nodejs

Now that we have `npm`, we have some other binaries we need to install to your
system. `mocha`, `gulp`, and `phantomjs`.

	npm install -g mocha gulp phantomjs

## Setup

Now that we have the project's binary dependencies on your device, we'll need to
get the skeleton project. First, navigate to the project you want to add E2E
test suites to.

	cd ~/WebServer/my-project

Now we'll clone the skeleton project. We can remove the VCS info since this code
will simply become part of your project. 

	git clone ssh://vc.emfluence.com/git/test.suite.base.2015.mocha tests
	rm -rf tests/.git

Now we need to get the dependencies at the project level. Simply run `npm
install` in the new `tests` directory.

	cd tests
	npm install

## Configuration

Edit `config.js` and the values it contains to fit your project's general needs.

Copy `config.js` to `env.config.js` and edit the values for your local testing purposes.

