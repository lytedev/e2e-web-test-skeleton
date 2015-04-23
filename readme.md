# Setup

See `docs/setup.md`.

_Note_: In the setup, you clone this repo into the `tests` folder in the root
of your project. Note that this repo also contains a `tests` directory. This
means that, from the perspective of your project's root,
`tests/tests/e2e/tests` is a directory. I'm sorry if this is confusing and am
open to feedback on any aspect of this project. The reasoning is that the
`$PROJECT_ROOT/tests` repo directory may contain more than just your e2e tests,
so the ability to add a `tests/tests/unit` directory for unit tests or
whatever. It may be more desirable to omit the `$PROJECT_ROOT/tests` directory
and just have the `e2e` folder be in the root of the tests repo. Such that
`tests/tests/e2e/tests` would just be `tests/e2e/tests`, which may be better.

As you're writing tests, you will be making heavy uses of the following
libraries. Links to their documentation is included for your sanity!

* [Selenium Webdriver (`selenium-webdriver`)][selenium] - Browser virtualization and control server manager
* [Mocha (`mocha`)][mocha] - JavaScript testing framework
* [Chai (`chai`)][chai] - Assertion library

## TL;DR?

    # Install Homebrew
    ruby -e "$(curl -fsSL \
		https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # Install NodeJS
    brew install nodejs

    # Install mocha, gulp, and phantomjs
    npm install -g mocha gulp phantomjs

    cd $YOUR_PROJECT

    # Clone the e2e testing repo
    git clone ssh://vc.emfluence.com/git/test.suite.base.2015.mocha tests

    # Don't need VCS info
    rm -rf tests/.git

    cd tests

    # Install testing dependencies
    npm install

    # Configure testing environment
    cp config.js env.config.js
    $EDITOR env.config.js

    # Run tests
    gulp

# Under the Hood

See `docs/under_the_hood.md`.

# FAQ

#### I want to test with Chrome!

See `docs/chromedriver.md`.


[chai]: http://chaijs.com/api/
[selenium]: http://selenium.googlecode.com/git/docs/api/javascript/index.html
[mocha]: http://mochajs.org/#getting-started
