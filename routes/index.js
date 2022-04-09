const express = require('express');

const createRouter = (objRepo) => {
  const router = new express.Router();
  const { tweetModel, userModel, uuidv4, db } = objRepo 

  return () => {
    router.get('/', (req, res, next) => {
      const users = userModel.find()
      console.log('req.session:', req.session)
      const currentUser = userModel.findOne({ id: req.session.userId })
      res.locals = { users, currentUser}
      res.render('index', res.locals);
    });
    
    // TWEET ROUTES
    // index
    router.get('/tweets', (req, res, next) => {
      // fetch all tweets from DB and order by created_at desc
      // render list of tweets
      const tweets = tweetModel.find()
      
      console.log(tweets)


      // const tweetsWithUsers = tweets.map(tweet => {
      //   const user = userModel.findOne({ id: tweet.userId });
      //   return {...tweet, user: user.username}
      // });

      // console.log(tweetsWithUsers);

      res.locals.tweets = tweets;
      // // res.locals.tweets = tweets[0].tweets;
      res.render('tweets', res.locals);
      // // res.render('index', res.locals)
    });
    
    router.get('/tweets/new', (req, res, next) => {
      console.log(req.session)
      // render an empty form to create a new tweet
      res.render('tweet_form');
    });
    
    // create
    router.post('/tweets', (req, res, next) => {

      console.log(req.body)
      const tweet = req.body.tweet.trim();
      console.log(tweet);
      console.log(req.session)
      console.log(req.session.userId)
      // check if tweet is valid
        // if not render form again with error message

      const user = userModel.findOne({id: req.session.userId})
      
      // create new tweet object
      const newTweet = {
        id: uuidv4(),
        text: tweet,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: user
      };

      console.log(newTweet)

      // // save tweet in DB
      tweetModel.insert(newTweet)

      db.saveDatabase(err => {
        if (err) {
          return res.status(500).send('Unable to save data to DB');
        }

        res.redirect('/tweets')
      });


      // // save tweet on res.locals
      // // redirect to index
      // // res.redirect('/');
    });
    
    // show
    router.get('/tweets/:id', (req, res, next) => {
      // fetch tweet from DB by id
      const tweet = tweetModel.findOne({ id: req.params.id })
        // if there is no tweet, send 404 status and message
      if (tweet === null) {
        return res.status(404).send('Tweet is not found')
      }

      res.locals.tweet = tweet;
      // render show template
      res.render('show_tweet', res.locals);
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
      const errorMessages = {
        username: '',
        email: '',
        password: ''
      };

      res.render('register_form', { errorMessages });
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
      !password ? errorMessages.password = 'password cannot be blank' : ''
      password !== password_confirmation ? errorMessages.password = 'passwords do not match' : ''
      

      

      console.log(errorMessages);

      isValidUserData = Object.values(errorMessages).every((val) => {
        return val === '';
      });

      console.log(isValidUserData);
      console.log(username, email)

      if (!isValidUserData) {
        res.locals.errorMessages = errorMessages
        res.locals.username = username
        res.locals.email = email


        return res.render('register_form', res.locals);
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

        res.redirect('/');     

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

    router.get('/login', (req, res, next) => {
      res.render('login_form')
    });

    router.post('/login', (req, res, next) => {
      const user = userModel.findOne({ email: req.body.email })

      if (user === null || user.password !== req.body.password) {
        return res.status(400).send('Invalid credentials');
      }

      req.session.userId = user.id;
      res.redirect('/')
    });

    router.get('/logout', (req, res, next) => {
      console.log(req.session)

      req.session.userId = null;

      res.redirect('/');
    });
  
    return router;
  };



  
};




module.exports = createRouter;