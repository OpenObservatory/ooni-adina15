## Client

This is the place for your application front-end files.

Instructions:

1) Make sure the `DB_URL` environment variable is set

2) Type the following from toplevel dir, to install all the required
dependencies and to prepare for development:

```
npm install
node_modules/.bin/lb-ng server/server.js client/js/lb-services.js
node_modules/.bin/bower install
```

Invoking ``lb-ng`` allows to regenerate the file containing Angular.js
services needed to interact with LoopBack objects.

Invoking ``bower`` allows to install / update the javascript libraries
upon which we depend on the client side.
