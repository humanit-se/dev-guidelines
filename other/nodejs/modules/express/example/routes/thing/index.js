const router = require('express').Router();
const one = require('./one.js')

router.get('/1', one);


module.exports = router;
