const router = require('express').Router();
const jokeRoutes = require('./joke-routes');

router.use('/jokes', jokeRoutes);


module.exports = router;