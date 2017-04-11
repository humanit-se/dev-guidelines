# JS ES5 guidelines (deprecated)

Please take a look at our [ES6 guidelines](es6.md) instead, we can use transpiler such as [Babel](https://babeljs.io/), with other tools such as [Webpack](https://webpack.js.org/) and [Browserify](http://browserify.org) to make our ES6 code browser friendly.

## Definitions

### keywords

*MUST* is used as a requirement.  
*SHOULD* is highly recommended.  
*MAY* is optional but encouraged.

## Code standard

We follow AirBnB ES5 guidelines. Below are the basics. See [https://github.com/airbnb/javascript/tree/es5-deprecated/es5](https://github.com/airbnb/javascript/tree/es5-deprecated/es5) for detailed documentation.

### Basics

- MUST use the literal syntax for object creation. ```var item = {};``` instead of ```var item = new Object();```.
- MUST use the literal syntax for array creation.  ```var item = [];``` instead of ```var item = new Array();```.
- MUST always use `var` to declare variables to avoid polluting the global namespace.
- SHOULD use one var declaration per variable.
- SHOULD declare unassigned variables last.
- MUST NEVER use reserved words as keys. [List of reserved words](http://es5.github.io/#x7.6.1).
- SHOULD use `===` and `!==` over `==` and `!=`.
- MUST use braces with all multi-line blocks.
- MUST put `else` on the same line as your if block's closing brace.

#### Functions

- MUST NOT declare a function in a non-function block (if, while, etc). Assign the function to a variable instead.
- Never name a parameter arguments, use args.

#### Arrays & Objects

- MUST use Array#push instead of direct assignment to add items to an array.
- When you need to copy an array use Array#slice. [See example](http://jsperf.com/converting-arguments-to-an-array/7).
- MOST NOT use dot notation when accessing properties. Use subscript notation `[]` when accessing properties with a variable.

#### Strings

- MUST use single quotes `''` for strings.
- Strings longer than 100 characters SHOULD be written across multiple lines using string concatenation.
- When programmatically building up a string, one SHOULD use Array#join instead of string concatenation.

#### Naming schemes

- MUST use camelCase when naming objects, functions, and instances.
- MUST use PascalCase when naming constructors or classes.
- SHOULD use a leading underscore _ when naming private properties.
- When saving a reference to this one SHOULD use \_this.
- MUST name your functions. This is helpful for stack traces.

#### jQuery

- Prefix jQuery object variables with a $.
- Cache jQuery lookups. [See example](https://github.com/airbnb/javascript/tree/master/es5#jquery).

### Exempts

- Code MUST use 4 spaces for indenting, not tabs.
- There MUST NOT be a hard limit on line length; the soft limit MUST be 120 characters; lines SHOULD be 80 characters or less.

## Namespace, patterns & modules

### Namespace

To not clutter the global namespace one MUST always namespace and scope it's JavaScript.

```
var MyProject = MyProject || {};
MyProject.MyModule = 'This is my modules scope in the project MyProject!';
```

### Modules

A good way to write module JavaScript.


```
// File: MyModule.js
var MyProject = MyProject || {};
MyProject.MyModule = (function() {

    // This won't be accessed from the outside.
    var _privateVar = 'private';

    // Constructor
    function MyModule()
    {
        this.notPrivate = _privateVar;
        this.myMethod();
        // Some more stuff...
    }

    MyModule.prototype.myMethod = function(args)
    {
        console.log(this.notPrivate);
        // Some more stuff...
    };

    function myPrivateMethod() {
        // This won't be accessed from the outside.
    }

    return new MyModule();
    // Or one could just return the constructor
    // return MyModule;
})();

// File: MyOtherModule.js
var MyProject = MyProject || {};
MyProject.MyOtherModule = (function() {
    // Stuff to do in my other module.
})();
```

## JavaScript in projects

### Basics

- MUST use [Gulp](http://gulpjs.com/) to concatenate .js-files into a scripts.js file. One SHOULD also create a minfified version called scripts.min.js. One MAY also separate footer and header scripts with two files; scripts.header.js and script.footer.js.
