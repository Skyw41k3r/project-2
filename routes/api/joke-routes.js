const router = require('express').Router();
const { jokes, zingers } = require('../../models');

// get joke route 
router.get('/', (req, res) => {
 
  jokes.findAll({
    include: {
      model: jokes,
      attributes: ['joke', 'id']
    }
})
  .then(jokeResponse => {
    const posts = jokeResponse.map(post => post.get({ plain: true }))
        res.render('homepage', {posts, loggedIn: req.session.loggedIn, title: 'Home'})
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// get punchline route 
router.get('/', (req, res) => {
 
    zingers.findAll({
      include: {
        model: zingers,
        attributes: ['zinger', 'id']
    }
})
.then(zingerResponse => res.json(zingerResponse))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

// post new joke to database 


module.exports = router;