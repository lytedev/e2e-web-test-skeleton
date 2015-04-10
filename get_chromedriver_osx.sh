#!/usr/bin/env bash

wget http://chromedriver.storage.googleapis.com/2.15/chromedriver_mac32.zip
unzip chromedriver_mac32.zip
sudo mv chromedriver /usr/local/bin
rm chromedriver_mac32.zip

