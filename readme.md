# Setup

First, let's walk through getting to the point where you're capable of running
the test suites.

## Homebrew

I use Homebrew for managing dependencies and libraries. You may use whatever you
wish! If you'd like to get Homebrew, just run this command: 

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

## Dependencies

We're going to use Homebrew to install NodeJS and its package manager. Node's
package manager `npm` is pretty fantastic and gives us the quickest/easiest
access to the components that make up our E2E test suite system.

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

Open `tests/config.js` and change the values inside to reflect your project. 

## Usage

You can see a list of gulp tasks (test suites) with `gulp --tasks`. You can run
all appropriate tests with the default task, which is run with just `gulp`.

