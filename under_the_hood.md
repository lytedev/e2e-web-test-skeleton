# Under the Hood

So now that we're all set up, we should make some tests! In the `tests/e2e`
directory, we can get a glimpse of how we structure our tests.

	$ tree -d tests/e2e -L 1
	tests/e2e
	├── specs
	├── suites
	└── tests

The `tests/e2e/specs` directory contains endpoint specifications. This is an
abstraction layer responsible for interacting with elements either in the
browser or in an API endpoint. *The core of your tests are contained in your
endpoint specs.* Tests will essentially link together the functionality defined
in your specs and assert things, though your specs can assert things as well!
Why not? Spec files should really just contain any variables, endpoint data,
and encapsulate any browser functionality to avoid having such things hardcoded
in the test files.

In the `tests/e2e/tests` directory, we'll find our actual tests. These are
self-contained bits of browser action that are governed by our endpoint specs
and make sure things are working properly. Feel free to open up a few of the
existing tests and check out how they're structured. Those of you familiar
with [`mocha`](http://mochajs.org) as a testing framework should be fairly
familiar with the testing structure.

For example, we may have a spec for logging in that defines the method by which
a user may login to the site using a standard web browser and we might a page
spec for making sure that certain styles are present to make sure different CSS
files are loaded for an authenticated user. A test might load the login page
spec, log the user in, then load the style spec and check the styles.

Because our tests may be chained together, each test must be very modular and
should expect the browser to be in almost _any_ possible state. Now, of course,
you should structure your suites (more on that in a second) in such a way as to
not allow for too many different options, but you'll want to just keep this
fact in mind when writing your tests.

We've adopted this design in order to provide the best-possible,
easiest-to-maintain code. If a page or endpoint changes in future development
and a test failure indicates as such, we know that we just need to change the
spec. The test should always be reliable - which is kind of the point with
tests.

The last directory here is the `tests/e2e/suites` directory. It's also the
simplest! This folder contains our test suites. A suite is a collection of
tests that run in sequence (or other suites!) for chaining functionality and
making sure different aspects of the site work in tandem. For every suite, we
will start a browser session and kill that session at the end. The test flow
within a suite should follow this understanding. A suite file is essentially
a JavaScript object with a `name` and at least one of the following defined: 

* `tests`: An array of strings that are [gulp
	globs](https://github.com/isaacs/node-glob). `./tests/e2e/tests/` will
	automatically be prepended and `.js` will automatically be appended to
	every value.
* `suites`: An array of strings that are either suite keys (see `e2eSuites` in
	`gulpfile.js`) or gulp globs. In the case of globs, `./tests/e2e/suites/`
	will be prepended and `.js` will be appended.
* `beforeSuites`: The same as `suites`, only they will be run before `tests`
	instead of after. I can't think of any particular use case for this, but
	it's there nonetheless.

# The `e2e` Object

All the end-to-end tests should make use of the helper object and its
methods/properties found at `tests/e2e/index.js`. This can be accessed globally
as the `e2e` variable. Any functionality you would like accessible by all your
end-to-end tests should be contained in the e2e object.

Here's a quick list of the handy methods that you'll use all the time:

* `e2e.getSpec(spec)` will `require('./specs/' + spec + ".js")`. Use this to
	load all your endpoint spec files!
* `e2e.defaultSpec(spec, test)` sets up you endpoint spec with some expected default
