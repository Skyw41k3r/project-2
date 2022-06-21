const router = require('express').Router();
const { jokes } = require('../../models');

// get joke route 
router.get('/', (req, res) => {
 
  jokes.findAll({
    include: {
      model: jokes,
      attributes: ['id', 'joke', 'zinger']
    }
})
  .then(jokeResponse => 
    res.json(jokeResponse))
    // const posts = jokeResponse.map(post => post.get({ plain: true }))
    //     res.render('homepage', {posts, loggedIn: req.session.loggedIn, title: 'Home'})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// get punchline route 
// router.get('/', (req, res) => {
 
//     zingers.findAll({
//       include: {
//         model: zingers,
//         attributes: ['zinger', 'id']
//     }
// })
// .then(zingerResponse => res.json(zingerResponse))
// .catch(err => {
//   console.log(err);
//   res.status(500).json(err);
// })
// });

// post new joke to database 
router.post('/', (req, res) => {
  jokes.create({
    jokes: req.body.jokes
  })
  .then(jokeResponse => res.json(jokeResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// post new punchline to database
// router.post('/', (req, res) => {
//   zingers.create({
//     zingers: req.body.zingers
//   })
//   .then(zingerResponse => res.json(zingerResponse))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// });


module.exports = router;