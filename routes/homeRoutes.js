const router = require('express').Router();
const { User } = require('../models')

router.get('/', async (req, res) => {
    try {
      const UserData = await User.findOne({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const Users = UserData.map((User) => Users.get({ plain: true }));
  
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
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;