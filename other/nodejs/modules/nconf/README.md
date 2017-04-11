nconf
====================

Hierarchical node.js configuration with files, environment variables, command-line arguments,
and atomic object merging.

Site: [npmjs.org - nconf](https://www.npmjs.com/package/nconf)


Directory structure
----------------------------------

| Directory/file               | Explanation                                                   |
| -----------------------------|---------------------------------------------------------------|
| `config/`                    | Config files                                                  |


Configuration
----------------------------------

nconf should always be configured so that it will always look first for the (1) commandline
parameters, (2) environment variables, (3) custom configurations (should always be in
`.gitignore`), (4-) other configuration files


Example
----------------------------------

The repository also contains example nconf setup ([example/](example/)) that you can use for your project.
