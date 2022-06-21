const router = require('express').Router();
const apiRoutes = require('./api');

const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);


const homeRoutes = require('./HomeRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);

const homeRoutes = require('./homeRoutes.js');
const userRoutes = require('./userRoutes.js');

const { route } = require('./homeRoutes');

router.use('/', homeRoutes)
router.use('/user', userRoutes)
router.use('/api', apiRoutes);

//router.use((req, res) => {
//  res.send("<h1>Wrong Route!</h1>")
//});

module.exports = router;