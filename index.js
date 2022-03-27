const path = require('path');

const express = require('express');

const initializeDB = require('./services/db');
const seeder = require('./services/db/seed')

const app = express();

// Setting up static assets middleware for route '/static'
app.use('/static', express.static(path.join(__dirname, 'public')));

// Setting up body parser middleware for accessing data submitted via forms
app.use(express.urlencoded({ extended: false }));

const port = 5000;
const host = '127.0.0.1'

const objectRepo = {
  db: null,
  tweetModel: null,
  userModel: null,
};

app.get('/', (req, res, next) => {
  res.redirect('/tweets');
});

// TWEET ROUTES
// index
app.get('/tweets', (req, res, next) => {
  // fetch all tweets from DB and order by created_at desc
  // render list of tweets
  const tweets = objectRepo.tweetModel.find()
  // console.log(tweets);
  res.json(tweets);
});

app.get('/tweets/new', (req, res, next) => {
  // render an empty form to create a new tweet
  res.send('Create tweet form');
});

// create
app.post('/tweets', (req, res, next) => {
  // check if tweet is valid
    // if not render form again with error message
  // save tweet in DB
  // save tweet on res.locals
  // redirect to index
  res.send('Creating a new tweet');
});

// show
app.get('/tweets/:id', (req, res, next) => {
  // fetch tweet from DB by id
    // if there is no tweet, send 404 status and message
  // render show template
  res.send('Fetching a specific tweet');
});

app.get('/tweets/:id/edit', (req, res, next) => {
  // fecth tweet from DB by id
    // if there is no tweet, send 404 status and message
  // place tweet on res.locals
  // render a form prepopulated by the tweet data
  res.send('Edit tweet form');
});

// update
app.patch('/tweets/:id', (req, res, next) => {
  // check if tweet is valid
    // if not render form again with error message
  // save tweet in DB
  // save tweet on res.locals
  // redirect to show
  res.send('Updating a specific tweet');
});

// delete
app.delete('/tweets/:id', (req, res, next) => {
  // delete tweet from DB
  // redirect to index
  res.send('Deleting a specific tweet');
});

initializeDB((err, { db, tweetModel }) => {
  if (err) {
    return console.log('Database initialization failed. Server won\'t start.');
    
  }
  objectRepo.db = db;
  objectRepo.tweetModel = tweetModel;
  console.log('Sucessfully initialized database.');
  const seedDB = seeder(objectRepo, 'tweet');
  seedDB();
  
  
  app.listen(port, host, () => {
    console.log(`Server is listening on PORT ${port}...`)
  })
});
