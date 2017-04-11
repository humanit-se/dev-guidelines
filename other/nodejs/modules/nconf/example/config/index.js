/**
 * Load configs to nconf
 *
 * The order of nconf calls defines the order for nconf.get(), which will return the first
 * found match. After this file has been loaded once, the config variables can be accessed
 * through nconf.
 */
var fs = require('fs'),
    nconf = require('nconf');


/**
 * Resolve requested (nconf.get()) config value in following order
 */
nconf.argv(); // (1) command line arguments
nconf.env(); // (2) environment variables

// If custom.js config is present, load it next
if (fs.existsSync(__dirname+'/custom.js')) {
  // (3) custom config file
  nconf.use('custom', { type: 'literal', store: require('./custom.js') });
}

// (4) node environment specific config file (if nonexistent, default to development)
var env = process.env.NODE_ENV || 'development';
nconf.use('node_env', { type: 'literal', store: require('./'+ env + '.js') });

// (5) when nothing else is found, default to production config
nconf.use('default', { type: 'literal', store: require('./production.js') });

// Set derived configs (so that priority overwrites get considered)
// (6) derived values
nconf.use('derived', { type: 'literal', store: {
  // Add derived configs here (fe. "thang: nconf.get('thing') + '-thang'")
}});
