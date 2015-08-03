## Client

This is the place for your application front-end files.

Instructions:

1) Make sure the `DB_URL` environment variable is set

2) Type the following from toplevel dir

```
npm install
cd client
mkdir js
../node-modules/.bin/lb-ng ../server/server.js js/lb-services.js
```

3) To add dependencies

```
npm install bower
../node-modules/.bin/bower install angular angular-resource
```
