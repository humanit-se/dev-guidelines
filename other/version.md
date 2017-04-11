# Versioning guidelines

We should keep structured and well managed versions of all our software.
To do this we SHOULD follow [Semantic Versioning](http://semver.org/).

## General about Semantic Versioning

A version can be major, minor or patch.

* Changing 1.0.0 to 2.0.0 is a major version change.
* Changing 1.0.0 to 1.1.0 is a minor version change.
* Changing 1.0.0 to 1.0.1 is a patch version change.

These version changes correlate to the degree of change done.

* Major means it is a breaking change, things might not be compatable with old versions.
* Minor version intruduces new features or bigger changes, but will not break anything old.
* Patch is just a bugfix or other very small changes.

## Versioning a Wordpress plugin or theme where package.json is available

**1. Update version in your plugins main file**

```php
/*
Plugin Name: Awesome plugin
Version: 1.0.2
Author: The author
Description: A plugin
*/
```

**2. Bump version with npm**

If package has a package.json the rest of versioning can be updated with the `npm version` command;

```shell
npm version patch
```
This will update the version in package.json, create a commit and tag via git.

**3. Push commits and version tag**

```
git push origin master && git push origin master --tags
```

## Versioning a Wordpress plugin or theme without a package.json


**1. Update version in your plugins main file**

```php
/*
Plugin Name: Awesome plugin
Version: 1.0.2
Author: The author
Description: A plugin
*/
```

**2. Commit your changes**

```
git add -A
git commit -m "Version 1.0.2"
```

**3. Create a tag with git**

```
git tag -a v1.0.2 -m "Version 1.0.2"
```

**4. Push commits and version tag**

```
git push origin master && git push origin master --tags
```

## Versioning a Node project

Node projects only need to use the `npm version` command.

**1. Update version**

```shell
npm version patch
```

**2. Push commits and version tag**

```
git push origin master && git push origin master --tags
```
