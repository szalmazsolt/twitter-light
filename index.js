const path = require('path');
const express = require('express');
const initializeDB = require('./services/db');
const createRouter = require('./routes');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up static assets middleware for route '/static'
app.use('/static', express.static(path.join(__dirname, 'public')));

// Setting up body parser middleware for accessing data submitted via forms
app.use(express.urlencoded({ extended: false }));

// body parser for json data
app.use(express.json());

const port = 5000;
const host = '127.0.0.1'

const objectRepo = {
  db: null,
  tweetModel: null,
  userModel: null,
};



initializeDB((err, { db, tweetModel }) => {
  if (err) {
    return console.log('Database initialization failed. Server won\'t start.');
    
  }
  objectRepo.db = db;
  objectRepo.tweetModel = tweetModel;
  console.log('Sucessfully initialized database.');

  const mountRoutes = createRouter(objectRepo);
  app.use(mountRoutes());
  
  
  app.listen(port, host, () => {
    console.log(`Server is listening on PORT ${port}...`)
  })
});

module.exports = objectRepo;