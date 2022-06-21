const router = require('express').Router();
const { User, jokes} = require('../../models');

// all users api
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// find users by individual id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
    }).then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// make a new user

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            // req.session.loggedIn = true;

            res.json(userData);
        });
    
    })
});

// log in using findOne to see if a user info is in db
router.post('/login', (req, res) => {
        // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email:req.body.email
        }
    }).then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'email provided not found!'});
            return;
        }
        const validatePassword = userData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(400).json({ message: 'Password Incorrect' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are logged in!' });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout route
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;