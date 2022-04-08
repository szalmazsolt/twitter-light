const express = require('express');

const createRouter = (objRepo) => {
  const router = new express.Router();
  const {tweetModel} = objRepo 

  return () => {
    console.log('router runs...')
    router.get('/', (req, res, next) => {
      res.redirect('/tweets');
    });
    
    // TWEET ROUTES
    // index
    router.get('/tweets', (req, res, next) => {
      // fetch all tweets from DB and order by created_at desc
      // render list of tweets
      const tweets = tweetModel.find()
      console.log(tweets[0].tweets);
      // res.json(tweets);
      res.locals.tweets = tweets[0].tweets;
      res.render('index', res.locals)
    });
    
    router.get('/tweets/new', (req, res, next) => {
      // render an empty form to create a new tweet
      res.send('Create tweet form');
    });
    
    // create
    router.post('/tweets', (req, res, next) => {
      // check if tweet is valid
        // if not render form again with error message
      // save tweet in DB
      // save tweet on res.locals
      // redirect to index
      res.send('Creating a new tweet');
    });
    
    // show
    router.get('/tweets/:id', (req, res, next) => {
      // fetch tweet from DB by id
        // if there is no tweet, send 404 status and message
      // render show template
      res.send('Fetching a specific tweet');
    });
    
    router.get('/tweets/:id/edit', (req, res, next) => {
      // fecth tweet from DB by id
        // if there is no tweet, send 404 status and message
      // place tweet on res.locals
      // render a form prepopulated by the tweet data
      res.send('Edit tweet form');
    });
    
    // update
    router.patch('/tweets/:id', (req, res, next) => {
      // check if tweet is valid
        // if not render form again with error message
      // save tweet in DB
      // save tweet on res.locals
      // redirect to show
      res.send('Updating a specific tweet');
    });
    
    // delete
    router.delete('/tweets/:id', (req, res, next) => {
      // delete tweet from DB
      // redirect to index
      res.send('Deleting a specific tweet');
    });
  
    return router;
  };



  
};




module.exports = createRouter;