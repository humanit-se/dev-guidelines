# JS ES6 guidelines

## Definitions

### keywords

*MUST* is used as a requirement.  
*SHOULD* is highly recommended.  
*MAY* is optional but encouraged.

## Code standard

We follow AirBnB ES6 guidelines. See [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript) for detailed documentation.

To make this work in browsers that does not yet support ES6, we can use transpiler such as [Babel](https://babeljs.io/), with other tools such as [Webpack](https://webpack.js.org/) and [Browserify](http://browserify.org).

## JavaScript in projects

### Examples

#### Using Babel

##### Install:

```shell
npm install --save-dev babel-cli babel-preset-env
```

##### Config Babel:

You can set your Babel config via a [.babelrc](https://babeljs.io/docs/usage/babelrc/)-file or directly via package.json.

.babelrc example:

```json
{
  "presets": [
    "env"
  ]
}
```

package.json example:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [
      "env"
    ]
  }
}
```

##### Code example 1

_A basic example when we just need to compile 1 JavaScript file._

index.js:

```javascript
function test(name, callback) {
  let msg = `Hello ${name}`;
  callback(msg);
}

jQuery(() => {
  test('Peter', (msg) => {
    console.log(msg);
  });
});
```

Transpile with Babel:

```shell
node_modules/babel-cli/bin/babel.js index.js --out-file index.compiled.js
```

Output:

```javascript
'use strict';

function test(name, callback) {
  var msg = 'Hello ' + name;
  callback(msg);
}

jQuery(function () {
  test('Peter', function (msg) {
    console.log(msg);
  });
});
```

##### Code example 2

_A more advanced example when we have many JavaScript file we want to compile into one bundle-file._

src/index.js:

```javascript
function test(name, callback) {
  let guy = new Person(name);
  let msg = `Hello ${guy.getName()}`;
  callback(msg);
}

jQuery(() => {
  test('Peter', (msg) => {
    console.log(msg);
  });
});

```

src/Person.js

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
```

Transpile a directory of files with Babel:

```shell
node_modules/babel-cli/bin/babel.js src --out-file index.compiled.js
```

Output:

```javascript
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Person;
}();
'use strict';

function test(name, callback) {
  var guy = new Person(name);
  var msg = 'Hello ' + guy.getName();
  callback(msg);
}

jQuery(function () {
  test('Peter', function (msg) {
    console.log(msg);
  });
});
```

This by default just transpiles JavaScript to JavaScript, from ES6 to ES5. It allows you to use arrow-functions, let, const, etc. It does not allow us to use new stuff such as Promises. If you need this or other new cool stuff you should also use [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

If you need import/export/require you should probably take a look at [Browserify](http://browserify.org) or [Webpack](https://webpack.js.org/).