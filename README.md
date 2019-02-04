# Dumb proxy

How it works
------------

The app will serve all files from the `static` directory. All requests to endpoints that dont exist in that directory, are being proxied to the domain you specify in `server.js` file.

How to run
----------

1. Clone repo
2. Install dependencies with `npm install`
3. Run with `node server.js`
4. Visit http://localhost:3000/login.html
