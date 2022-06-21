const router = require('express').Router();
const jokeRoutes = require('./joke-routes');
const userRoutes = require('./userRoutes')

router.use('/jokes', jokeRoutes);
router.use('/user', userRoutes);


module.exports = router;