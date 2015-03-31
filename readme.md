This quick guide should explain how to get our Front-End E2E base test suite up
and running on OSX. 

## Homebrew

Throughout this tutorial, I use the OSX package manager "Homebrew" extensively
for managing binaries, libraries, and dependencies. MacPorts is supposedly a
viable alternative, but is unsupported in this guide.

I also get the JDK through Homebrew, though I took noteof an application
called "jEnv" for managing your Java environment that may prove a superior
solution. As of now, though, it is unused in this guide. It may be worth
looking into in the future, though.

# Dependencies

Before you proceed, you will at least need the following binaries (in your
PATH): 

* `npm` (NodeJS)
* `brew` (Homebrew package manager)

# Setup

There are a couple things we'll need from `npm` and `brew` if you don't already
have them. Specifically, `mocha`, our automated testing framework, `gulp`, our
task runner and manager, and `phantomjs`, a non-gui virtual browser for
emulation. We'll install these globally on our system through `npm`. 

```bash
npm install -g mocha gulp phantomjs
```

The rest of our dependencies will be installed automatically thanks to `npm`
when we setup the actual project.

Emfluence has a skeleton project for which tests should be built on and as an
effort to manage code. The exact implementation of this system is still up in
the air, but for now, we're gonna clone in a bare repo as our base.

Now we'll go ahead and install the components we need that make up our testing
suite. 

```bash
cd ~/WebServer/my-project
git clone ssh://vc.emfluence.com/git/test.suite.base.2015.mocha tests
rm -rf tests/.git # We don't want any of the VCS info
```

**Note**: If you already have a tests directory, there may be an issue. This is something
we'll likely need to evaluate if/when it happens, but I can't imagine running
into it too soon, so I didn't look into it much. 

Our testing suite now needs all of its dependencies installed. All of these are
managed by `npm` (unless a specific project has very focused needs, which will
hopefully be specified in the project's documentation). If you'd like to review
Sthis information, open the `package.json` and look at the `devDependencies`
key. Let's get our dependencies in with a quick command.

```bash
cd tests
npm install 
```

Generally, any configuration that needs to be done project-wide should happen
in `gulpfile.js`, including the site's root URL. Go ahead and edit that file
and configure the variables for your project.

Specific test suites will likely also need configuring, such as what sort of
title to expect from the index, the selector for the search form, etc. Be sure
to run the base tests and see which ones fail to see which ones are irrelevant
and which ones need some configuring. These sort of configuration values should
be stored near the top of the file just after your `require` calls.

We should be all set up to run tests for your project! 

# Usage

From your `tests` directory, simply run your task runner. In our case, that's
gulp.

```bash
gulp test
```

**Note**: In a perfect and utopian future, every Emfluence project is built
with a task runner like gulp, so the exact details for usage may differ between
projects ultimately, though the `test` task is almost unanimously for testing,
there may be differences in types of testing. Also, the gulpfile may be in the
actual project root due to being used for building or watching more than just
the testing aspect, so you may run `gulp test` from the project root directory
instead. 

Hopefully, you get all passing results! You might see some failures and reasons
for them, but what you don't wanna see are non-test related errors. That means
something was setup incorrectly. 

## Happy testing!

The cake is a lie.

