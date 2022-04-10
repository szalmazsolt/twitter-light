const path = require('path');
const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override');

const initializeDB = require('./services/db');
const createRouter = require('./routes');

const app = express();
const router = new express.Router();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up static assets middleware for route '/static'
app.use('/static', express.static(path.join(__dirname, 'public')));

// Setting up body parser middleware for accessing data submitted via forms
app.use(express.urlencoded({ extended: false }));

// body parser for json data
app.use(express.json());

// to use PATCH and DELETE methods in HTML forms
app.use(methodOverride('_method'))

const port = 5000;
const host = '127.0.0.1'

app.use(session({
  secret: 'ug8zgGUZG(=LKU2+"njnjkLOG/.!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
  })
);


const objectRepo = {
  db: null,
  tweetModel: null,
  userModel: null,
  uuidv4,
  router
};



initializeDB((err, { db, tweetModel, userModel }) => {
  if (err) {
    return console.log('Database initialization failed. Webserver won\'t start.');
    
  }
  objectRepo.db = db;
  objectRepo.tweetModel = tweetModel;
  objectRepo.userModel = userModel;
  console.log('Sucessfully initialized database.');

  const mountRoutes = createRouter(objectRepo);
  app.use(mountRoutes());
  
  
  app.listen(port, host, () => {
    console.log(`Server is listening on PORT ${port}...`)
  })
});

module.exports = objectRepo;