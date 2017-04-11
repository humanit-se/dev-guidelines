# PHP Guidelines

## Definitions

### keywords
*MUST* is used as a requirement.  
*SHOULD* is highly recommended.  
*MAY* is optional but encouraged.

## Code standard
We follow PSR guidelines. Below are the basics. See http://www.php-fig.org/ for detailed documentation.

### Basics

- Files MUST use only `<?php` and `<?=` tags.
- Files MUST use only UTF-8 without BOM for PHP code.
- Files SHOULD *either* declare symbols (classes, functions, constants, etc.) *or* cause side-effects (e.g. generate output, change .ini settings, etc.) but SHOULD NOT do both.
- Namespaces and classes MUST follow an "autoloading" PSR-4  
- Class names MUST be declared in `StudlyCaps`.
- Class constants MUST be declared in all upper case with underscore separators.
- Method names MUST be declared in `camelCase`.
- Code MUST use 4 spaces for indenting, not tabs.
- There MUST NOT be a hard limit on line length; the soft limit MUST be 120 characters; lines SHOULD be 80 characters or less.
- There MUST be one blank line after the `namespace` declaration, and there MUST be one blank line after the block of `use` declarations.
- Opening braces for classes MUST go on the next line, and closing braces MUST go on the next line after the body.
- Opening braces for methods MUST go on the next line, and closing braces MUST go on the next line after the body.
- Visibility MUST be declared on all properties and methods; `abstract` and `final` MUST be declared before the visibility; `static` MUST be declared after the visibility.
- Control structure keywords MUST have one space after them; method and function calls MUST NOT.
- Opening braces for control structures MUST go on the same line, and closing
  braces MUST go on the next line after the body.
- Opening parentheses for control structures MUST NOT have a space after them, and closing parentheses for control structures MUST NOT have a space before.

### Extras not included in PSR
- Code documentation SHOULD be done with PHPDoc standard (http://www.phpdoc.org).
- Methods MUST have at least description, return and param where applicable.
- Class dependencies SHOULD be handled with dependency injections in favor for hard dependencies. (http://www.phptherightway.com/#basic_concept)
- Well known design patterns SHOULD be used where applicable, for example MVC, Singletons, Factories etc.
- PHP7 features (such as null coalescing operators and strict type hinting and return types) SHOULD be used where applicable unless older version compatibility is a specified requirement.

## Project structure

### Basics
- Projects SHOULD use composer for project dependencies.
- Functionality that can and will be reused SHOULD be its own project and included as a dependency instead.
- EditorConfig (http://editorconfig.org/) MAY be used

### Example composer.json
```
{
    "name": "company/awesome-project",
    "version": "1.0.0"
    "description": "This is an awesome project",
    "license": "MIT",
    "keywords": ["company"],
    "authors": [
        {
            "name": "Mr Developer",
            "email": "mrdeveloper@company.com"
        }
    ],
    "require": {},
    "require-dev": {
        "phpunit/phpunit": "4.0.*"
    },
    "autoload": {
        "psr-4": {
            "Company\\AwesomeProject\\": "src"
        }
    }
}
```

### Example project structure
This is a example project structure using composer and gulp:

```
[source] - all the source files for the project
  [js]
    [vendor]
      [jQuery-1.9]
      [vue]
    app.js
  [php]
    [Helper]
      Localizer.php
    [Views]
      home.php
      admin.php
  [sass]
    styles.scss
[dist] - all files that are compiled/minified (don't edit)
  [images]
  [css]
    styles.css
  [js]
    app.js
[vendor]
  [PSR4-autoloader]
  [PHPUnit]
.gitignore
README.md
composer.json
gulpfile.js
package.json
index.php
```
