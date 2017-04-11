const router = require('express').Router();
const thing = require('./thing');


router.get('/thing', thing);


// 404 handler
router.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
// (ignore 'defined but not used' jshint error since express error handler requires 4 parameters)
router.use((err, req, res, next) => { // jshint ignore:line
  res.status(err.status || 500).send({
    message: err.message
  });
});


module.exports = router;
