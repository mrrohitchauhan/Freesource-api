const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .then(category => {
     res.json(category);})

    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const username = req.body.username;
  const categorylist = req.body.category;
  const pathlist =req.body.pathlist;
  //const date = Date.parse(req.body.date);

  const newCat = new Category({
    //username,
    categorylist,
    pathlist
  });

  newCat.save()
  .then(() => res.json('Category added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;