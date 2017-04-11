morgan
====================

Request logging middleware for express apps

Site: [npmjs.org - morgan](https://www.npmjs.com/package/morgan)



## Example

Morgan should be added in `app.js` to prevent logging in fe. testing

```javascript
const morgan = require('morgan');

app.use(morgan('dev'));
```