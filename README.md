# Development Guidelines

## Common guidelines

* Always prefer simple solutions - Less error prone, easier on-boarding and maintenance
* Prefer loose coupling (events, pub/sub) - More flexible and robust architecture
* Prefer separation of concerns (microservices, functional programming); a service or piece of
code should not know anything about the rest of the world outside its main purpose  - More robust
solutions, faster iterations and easier maintenance
* Try to make yourself "expendable" - Everything should be documented/automated on the level that
anyone can jump in at moments notice


## Language guidelines                  

| Guide                                                    | Description                                                     |
| ---------------------------------------------------------|-----------------------------------------------------------------|
| [PHP](languages/php.md)                                  | PHP guidelines, examples and best practices                     |
| [JavaScript](languages/js.md)                            | JS and Node guidelines, examples and best practices             |
| [CSS/SASS](languages/css.md)                             | CSS/SASS guidelines, examples and best practices                |


## Tool guidelines

| Guide                                                    | Description                                                     |
| ---------------------------------------------------------|-----------------------------------------------------------------|
| [Git](tools/git.md)                                      | Git guidelines, examples and best practices                     |
| [Gulp](tools/gulp.md)                                    | Gulp guidelines, examples and best practices                    |
| [PHPUnit test in WP](tools/PHPUnitTest.md)               | Getting started with unit test in Wordpress                     |


## Service guidelines

| Guide                                                    | Description                                                     |
| ---------------------------------------------------------|-----------------------------------------------------------------|
| [AWS CloudFormation](services/aws_cloudformation.md)     | AWS CloudFormation guidelines and best practices                |


## Other guidelines

| Guide                                                    | Description                                                     |
| ---------------------------------------------------------|-----------------------------------------------------------------|
| [Node.js](other/nodejs/README.md)                        | Node.js guidelines and recommended modules                      |
| [API design](other/api.md)                               | API design guidelines and best practices                        |
| [Versioning](other/version.md)                           | Versioning guidelines and best practices                        |
