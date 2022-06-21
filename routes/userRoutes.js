const router = require('express').Router();
const { User, Jokes } = require('../models');


//Creating a user
router.post('/', async (req, res) => {
    try{
        const UserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(UserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logging in as a User
router.post('/login', async (req,res) => {
    try{
        const UserData = await User.findOne({
            where: {
                email: req.body.email
            },
        });

    if (!UserData) {
        res
          .status(400).json({ message: 'Incorrect email or password.'});
        return;
    }

    const validPassword = await UserData.checkPasseord(req.body.password);

    if (!validPassword) {
        res.status(400).json({meesage: 'Incorrect email or password'});
        return;
    }
    req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json({ user: UserData, message: 'Logged in succesfully'});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logging out as a user
router.post('/logout', (req,res) =>{
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
 } else {
    res.status(404).end();
 }
});

module.exports = router;