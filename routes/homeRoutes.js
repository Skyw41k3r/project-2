const router = require('express').Router();
const { User, Jokes } = require('../models')

router.get('/', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  console.log(req.session);
  Jokes.findAll({
    attributes: [
      'id',
      'joke',
      'zinger',
    ]
  })
  .then(JokesData => {
    const JokeList = JokesData.map(joke => joke.get({ plain: true }))
    
    res.render('homepage', {JokeList, title: 'Home'});
  })
  .catch(err => {
    console.debug(err);
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/dashboard', (req, res) => {

  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
  }

  Jokes.findAll({
    attributes: [
      'id',
      'joke',
      'zinger',
    ]
  })
  .then(JokesData => {
    const JokeList = JokesData.map(joke => joke.get({ plain: true }))
    
    res.render('dashboard', {JokeList, loggedIn: true, title: 'Dashboard'});
  })
  .catch(err => {
    console.debug(err);
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  console.log(req.session);
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/joke/:id', (req, res) => {

  Jokes.findOne({
      where: {
          id: req.params.id
      },
      attributes: ['id', 'joke', 'zinger'],
  })
  .then(jokeData => {
      if (!jokeData) {
          res.status(404).json({ message: 'No joke found with this id' });
          return;
      }
      const Joke = jokeData.get({ plain: true });
      res.render('new-joke', {
        Joke,
        loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;