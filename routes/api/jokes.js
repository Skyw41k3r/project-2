const router = require('express').Router();
const { User, Jokes } = require('../../models');
const withAuth = require('../../utils/auth');


// get all Jokes
router.get('/', (req, res) => {
    Jokes.findAll({
        attributes: [
            'id',
            'joke',
            'zinger',
        ]
    }).then(JokesData => res.json(JokesData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get Jokes by id
router.get('/:id', (req, res) => {

    Jokes.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'joke', 'zinger'],
    })
        .then(JokesData => {
            if (!JokesData) {
                res.status(404).json({ message: 'No joke found with this id' });
                return;
            }
            res.json(JokesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//New Jokes
router.post('/', withAuth, (req, res) => {
    Jokes.create({
        joke: req.body.joke,
        zinger: req.body.zinger
    })
        .then(JokesData => res.json(JokesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update the Jokesed route
router.put('/:id', withAuth, (req, res) => {
    Jokes.update(
        {
            joke: req.body.joke,
            zinger: req.body.zinger,
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(JokesData => {
            if (!JokesData) {
                res.status(404).json({ message: 'No joke found with this id' });
                return;
            }
            res.json(JokesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// destroy Jokes 
router.delete('/:id',withAuth, (req, res) => {
    Jokes.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(JokesData => {
            if (!JokesData) {
                res.status(404).json({ message: 'No joke found with this id' });
                return;
            }
            res.json(JokesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;