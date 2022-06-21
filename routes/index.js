const router = require('express').Router();
const apiRoutes = require('./api');
<<<<<<< HEAD
const homeRoutes = require('./HomeRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
=======
const homeRoutes = require('./homeRoutes.js');
const userRoutes = require('./userRoutes.js');

const { route } = require('./homeRoutes');

router.use('/', homeRoutes)
router.use('/user', userRoutes)
>>>>>>> 5d08ec3fd72f7280ef3e72124c92b9689594fc73
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;