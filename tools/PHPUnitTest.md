# PHP Unit Test with Wordpress - Quick guide

## Setup Wordpress test environment
Dowload and add [install-wp-tests.sh](https://github.com/wp-cli/wp-cli/blob/master/templates/install-wp-tests.sh) in a folder, could be /bin/ in your project.

Run the script:  

```
bash bin/install-wp-tests.sh wp_test root '' 127.0.0.1 latest
```

*Note 1:* This creates a new Wordpress test environment in /private/tmp/.   
*Note 2:* Params are [db-name] [db-user] [db-pass] [db-host] [wp-version].


### Run tests
```
./vendor/bin/phpunit
```

## Create new tests ###
All tests should be build in the same folder such as **/tests/unit/** and must be prefixed by **test-**

*Example:*
```
class WpTest extends WP_UnitTestCase
{
    // Test code...
}
```

All tests are class methods where the class must extend from ```WP_UnitTestCase``` which itself extends ```PHPUnit_Framework_TestCase```, but adds some Wordpress functionality.

### New Wordpress PhpUnit test methods

* assertQueryTrue   
    Check each of the WP_Query is_functions/properties() against expected boolean value.
* assertNotWPError   
    Check if not a WP error.
* assertWPError   
    Check if is WP error.

### Good reading material on PHPUnit testing and Wordpress

* https://pippinsplugins.com/unit-tests-wordpress-plugins-introduction/   
* https://pippinsplugins.com/unit-tests-wordpress-plugins-setting-up-testing-suite/   
* https://pippinsplugins.com/unit-tests-wordpress-plugins-writing-tests/   
* https://pippinsplugins.com/unit-tests-for-wordpress-plugins-the-factory/   
* https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/   
