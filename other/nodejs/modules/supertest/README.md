supertest
====================

Testing framework for express apps

Site: [npmjs.org - supertest](https://www.npmjs.com/package/supertest)



## Example

```javascript
const express = require('express');
const supertest = require('supertest');
const routes = require('../routes');

// Create blank express application and load routes into it
let app = express();
app.use(routes);


// Test that root route responds with 200
supertest(app)
  .get('/')
  .expect(200)
  .end(() => { console.log('test done'); });
```

### Example with mocha

```javascript
describe('GET /', () => {
  // `done` callback param creates asynchronous test case 
  it('should respond with 200', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .end(done); // Signal that test is done
  });
});
```