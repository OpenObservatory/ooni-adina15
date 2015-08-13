#!/bin/sh
# Script used to deploy to heroku
set -e
DIST_DIR="client/vendor/"
LB_SERVICES_JS="client/js/lb-services.js"
SERVER_JS="server/server.js"

git branch -D deploy || echo "First deployment"
git checkout -b deploy

node_modules/.bin/lb-ng $SERVER_JS $LB_SERVICES_JS
node_modules/.bin/bower install

git add -f $DIST_DIR
git add -f $LB_SERVICES_JS
git commit -m "Deploying to Heroku"
git push heroku -f deploy:master
git checkout master
