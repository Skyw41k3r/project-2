const router = require('express').Router();
const { User } = require('../models')

router.get('/', async (req, res) => {
    try {
      const UserData = await User.findByPk({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const Users = UserData.map((project) => Users.get({ plain: true }));
  
      res.render('homepage', { 
        Users, 
        loggedIn: req.session.loggedIn 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', async (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});

module.exports = router;