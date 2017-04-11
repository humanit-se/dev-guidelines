express
====================

Fast, unopinionated, minimalist web framework

Site: [npmjs.org - express](https://www.npmjs.com/package/express)


## Directory structure

| Directory/file               | Explanation                                                   |
| -----------------------------|---------------------------------------------------------------|
| `app.js`                     | Creates express `app` and non-functional logic (logging etc.) |
| `routes/`                    | Routing files that define the outcome of each URL             |
| `views/`                     | HTML files used to render pages                               |
| `views/layouts/`             | HTML files that contain different page layouts                |
| `views/layouts/index.html`   | The main HTML layout file                                     |
| `public/`                    | Static files served to the browser                            |
| `public/js`                  | Javascript files that are available for download              |
| `public/css`                 | CSS files that are available for download                     |
| `public/img`                 | Image files that are available for download                   |


## Configuration

When running in production `NODE_ENV` should be set to `production` so that express
caches the view files, enabling much faster performance.


## Routes

Routes should be separated into modules that follow the url structure (fe. `/content` route modules
should be located in `routes/content` directory). Every file should contain only one route function,
with `index.js` mounting them into actions. Route index files should also not contain any logic.


### Naming route modules/files

Each module should correspond to url it is responding to, with main files named as follows: 
`create.js`, `list.js`, `read.js`, `update.js` and `remove.js` 

__Note:__ Even though we follow CRUD, `delete` is a reserved word so it is not possible to do
`const delete = require('./delete');`), thus `remove` is used instead. Welcome to the world of
CLRUR (CRUD is so 2016 anwyays).

Any middleware that is not responsible directly creating a response, should be named with verb
prefix that describes its purpose (fe. `setUserData.js`, `handleBannedUser.js`) and should be
located in the first directory that contains all of its mount points.

__Example:__ If a `setUserData.js` middleware used in every main route, it should be in the main
routes directory (`routes/setUserData.js`). If it would be used in subroutes of `/content` route
module it should be located in `/routes/content/getUserData.js`. 


### express.Router()

Every separate route file should create `express.Router()`, set its middleware into it and export
the newly created router through `module.exports`. 

```javascript
var router = require('express').Router();

// Set routes

module.exports = router;
```


### Route structure example

`app.js` should contain the require for routes directory and set it as express middleware

```javascript
const routes = require('./routes');
app.use(routes);
```

`routes/index.js` should mount routes, and should not contain any logic

```javascript
const router = require('express').Router();
const content = require('./content');

router.get('/content', content);

module.exports = router;
```

`routes/content/index.js` should mount routes, and should not contain any logic

```javascript
const router = require('express').Router();
const one = require('./read.js')

router.get('/', read);

module.exports = router;
```

`routes/thing/read.js` contains the actual middleware logic

```javascript
function middleware(res, req) {
  res.send('You called url: GET /content/');
}

module.exports = middleware;
```

### Errors

Much like with asyc workflows, middlewares should not directly send error responses but just fire
the callback with an error object and let the error middleware handle it and decide how the
response should be sent.

For generating the error objects, [http-errors](https://www.npmjs.com/package/http-errors) is an
useful tool, as it also handles status codes.

Error can be generated like so:

```javascript
const httpErrors = require('http-errors');

(req, res, next) => {
  return next(httpErrors(400, 'Invalid parameter', {code: 10001}));
}
```


#### Error handling middleware

Error handling middleware should be the last middleware in the stack and should be defined with
4 parameters.

__Note:__ `// jshint ignore:line` comment is required since `next` is not used, however in order to
register as error handler the middleware requires 4 paramerters.

```javascript
router.use((err, req, res, next) => { // jshint ignore:line
  res.status(err.status).send({
    code: err.code,
    message: err.message
  });
});
```


## Example

The repository also contains example express setup ([example/](example/)) that you can use for your
project.