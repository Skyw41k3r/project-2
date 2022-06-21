const router = require('express').Router();

const userRoutes = require('./user');
const jokesRoutes = require('./jokes');

router.use('/users', userRoutes);
router.use('/jokes', jokesRoutes);

module.exports = router;