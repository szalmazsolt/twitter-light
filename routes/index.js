const express = require('express');

const createRouter = (objRepo) => {
  const router = new express.Router();
  const { tweetModel, userModel, uuidv4, db } = objRepo 

  return () => {
    console.log('router runs...')
    router.get('/', (req, res, next) => {
      // render home page here
      res.redirect('/tweets');
    });
    
    // TWEET ROUTES
    // index
    router.get('/tweets', (req, res, next) => {
      // fetch all tweets from DB and order by created_at desc
      // render list of tweets
      const tweets = tweetModel.find()
      
      // res.locals.tweets = tweets[0].tweets;
      res.json(tweets);
      // res.render('index', res.locals)
    });
    
    router.get('/tweets/new', (req, res, next) => {
      // render an empty form to create a new tweet
      res.send('Create tweet form');
    });
    
    // create
    router.post('/tweets', (req, res, next) => {
      // check if tweet is valid
        // if not render form again with error message
      // create new tweet object
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
      const tweet = tweetModel.findOne({ id: req.params.id })
      console.log(tweet)
      // delete tweet from DB
      // redirect to index
      res.send('Deleting a specific tweet');
    });


    // USER Routes
    router.get('/users', (req, res, next) => {
      const users = userModel.find()
      res.json(users);
    });

    router.get('/users/new', (req, res, next) => {
      res.send('New user form');
    });

    router.post('/users', (req, res, next) => {

      const username = req.body.username.trim();
      const email = req.body.email.toLowerCase().trim();
      const { password, password_confirmation } = req.body;

      let isValidUserData = true;

      const errorMessages = {
        username: '',
        email: '',
        password: ''
      };

      const existingUser = userModel.findOne({ email });

      existingUser !== null ? errorMessages.email = 'this email has been already registered' : ''

      !username ? errorMessages.username = 'username cannot be blank' : ''
      !email ? errorMessages.email = 'email cannot be blank' : ''
      !password ? errorMessages.password = 'username cannot be blank' : ''
      password !== password_confirmation ? errorMessages.password = 'passwords do not match' : ''
      

      

      console.log(errorMessages);

      isValidUserData = Object.values(errorMessages).every((val) => {
        return val === '';
      });

      console.log(isValidUserData);

      if (!isValidUserData) {
        return res.status(400).send(errorMessages);
      }


      
      const user = {
        id: uuidv4(),
        username,
        email: email.toLowerCase().trim(),
        password,
        createdAt: new Date()
      }
      userModel.insert(user)

      db.saveDatabase(err => {
        if (err) {
          return res.status(500).send('could not save db')
        }

        // Login user
        req.session.userId = user.id;
        console.log(req.session);

        res.status(201).send(user);     

      });

    });

    router.get('/users/:id', (req, res, next) => {
      res.send('Fetching user by id')
    });

    router.get('/users/:id/edit', (req, res, next) => {
      res.send('Edit user form')
    });

    router.patch('/users/:id', (req, res, next) => {
      res.send('Updating user')
    });

    router.delete('/users/:id', (req, res, next) => {
      const user = userModel.findOne({ id: req.params.id })

      userModel.remove(user)

      db.saveDatabase(err => {
        if (err) {
          return res.status(500).send('Could not delete user')
        }

        return res.send('User is deleted')
      });

    });
  
    return router;
  };



  
};




module.exports = createRouter;