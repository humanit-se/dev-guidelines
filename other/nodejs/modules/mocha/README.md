mocha
====================

Testing framework

Site: [npmjs.org - mocha](https://www.npmjs.com/package/mocha)



## Example

Just add `mocha` into your application and set `package.json` test script as:

`test: mocha tests/ --check-leaks`


### Testing web <applications></applications>

For any application that has web responses, describe them as separate routes:

```javascript
describe('GET /', () => {
  it('should respond with 200', () => {
    // ...
  });
});

describe('GET /things/id', () => {
  it('should respond with 200 on valid id', () => {
    // ...
  });

  it('should respond with 404 on non-existing id', () => {
    // ...
  });
});
```
