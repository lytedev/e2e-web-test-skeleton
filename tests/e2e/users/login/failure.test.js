var LoginPage = require('./login.page_spec');

test.describe('User login failure', function() {
  var page = new LoginPage();
  page.preSetup(this);

  e2e.defaultTestBefore(this); // Load browser, get page via spec url

  test.it('login fails with bad credentials', function() {
    page.defineElements();

    page.setUsername('s0m3_p00r_d00d');
    page.setPassword('t0t4l_f41lur3');
    page.submit().then(function() {
        driver.getCurrentUrl().then(function(url) {
            page.defineElements();
            assert.equal(url, page.url);
        });
    });
  });

  e2e.defaultTestAfter(this); // Close browser
});
