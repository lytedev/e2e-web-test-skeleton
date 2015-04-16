# Setting up Chrome with Selenium in OSX

* Download the ChromeDriver OSX zip from the ChromeDriver project downloads page: https://sites.google.com/a/chromium.org/chromedriver/downloads 
* Unzip the archive
* Move the `chromedriver` binary to `/usr/local/bin`

Done! Now you can use Chrome with Selenium.

# *Automatically* Setting up Chrome with Selenium in OSX

Ugh. Fine! Paste this in your terminal. 

```bash
wget http://chromedriver.storage.googleapis.com/2.15/chromedriver_mac32.zip
unzip chromedriver_mac32.zip
sudo mv chromedriver /usr/local/bin
rm chromedriver_mac32.zip
```

# No Really, Make it *EASY*

... This repo has a file named `bin/get_chromedriver_osx.sh`. Run it.

