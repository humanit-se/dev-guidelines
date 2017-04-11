# NodeJs guidelines

## Definitions

### keywords

*MUST* is used as a requirement.  
*SHOULD* is highly recommended.  
*MAY* is optional but encouraged.

## Code standard

When working with Node we use ES6 and follow [AirBnB ES6 guidelines](../../languages/es6.md).

- SHOULD use [ES6 code guidelines](../../languages/es6.md)


### Exempts from guidelines

#### 1. Modules
We do NOT use the `export default` as stated in [AirBnB ES6 Modules 10.1](https://github.com/airbnb/javascript#modules--use-them) as this is not yet supported by Node.

Instead use:

```
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;
```


### 2. Grouping similar definitions

With node.js, group native modules, npm modules and custom files/modules in their own require groups. 

```
const fs = require('fs');
const url = require('url);

const nconf = require('nconf');
const express = require('express');

const fnc1 = require('./fnc1');
```

## npm modules

SHOULD prefer [Node.js recommended modules](modules/README.md)
