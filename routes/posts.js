const router = require('express').Router();
let Posts = require('../models/post.model');

router.route('/').get((req, res) => {
  Posts.find({})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/category').get((req, res) => {
  const category=req.query.category;
  console.log("category :",category);
  const query = {
    category: {
      $elemMatch: {
      $eq: category
      }
    }
  }
  Posts.find(query)
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const username = req.body.username;
  const title = req.body.title;
  const body = req.body.body;
  const category=req.body.category;
  const resource=req.body.resource;
  //const date = Date.parse(req.body.date);

  const newPosts = new Posts({
    //username,
    title,
    body,
    category,
    resource
    
  });

  newPosts.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



//              ****** future use   *******


router.route('/:id').get((req, res) => {
  Posts.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      posts.username = req.body.username;
      posts.description = req.body.description;
      posts.duration = Number(req.body.duration);
      posts.date = Date.parse(req.body.date);

      posts.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;