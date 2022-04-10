const getUsersMW = require('../middlewares/getUsersMW');
const getTweetsMW = require('../middlewares/getTweetsMW');
const getLoggedInUserMW = require('../middlewares/getLoggedInUserMW');
const renderMW = require('../middlewares/renderMW');
const authMW = require('../middlewares/authMW');
const getUserMW = require('../middlewares/getUserMW');
const createTweetMW = require('../middlewares/createTweetMW');
const saveDBMW = require('../middlewares/saveDBMW');
const getTweetMW = require('../middlewares/getTweetMW');
const correctUserMW = require('../middlewares/correctUserMW');
const updateTweetMW = require('../middlewares/updateTweetMW');
const deleteTweetMW = require('../middlewares/deleteTweetMW');

const createRouter = (objRepo) => {
  
  const { userModel, db, router } = objRepo 

  return () => {
    // Home route
    router.get('/', 
      getUsersMW(objRepo),
      getTweetsMW(objRepo),
      getLoggedInUserMW(objRepo),
      renderMW('index')
    );

    // New tweet
    router.get('/tweets/new',
      authMW(),
      renderMW('tweet_form')
    );
    
    // Create tweet
    router.post('/tweets',
      getUserMW(objRepo),
      createTweetMW(objRepo),
      saveDBMW(objRepo),
      (req, res, next) => {
        res.redirect('/');
    });
    
    // Edit tweet
    router.get('/tweets/:id/edit',
      getTweetMW(objRepo),
      correctUserMW(),
      renderMW('edit_tweet_form')
    );
    
    // Update tweet
    router.patch('/tweets/:id',
      getTweetMW(objRepo),
      correctUserMW(),
      updateTweetMW(objRepo),
      saveDBMW(objRepo),
      (req, res, next) => {
        res.redirect('/');
      });
    
    // Delete tweet
    router.delete('/tweets/:id', 
      getTweetMW(objRepo),
      correctUserMW(),
      deleteTweetMW(objRepo),
      saveDBMW(objRepo),
      (req, res, next) => {
        res.redirect('/');
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
      const createdUser = userModel.insert(user)
      console.log(createdUser)

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

      console.log('Delete route')

      // const delConfirmed = prompt('Are you sure?');

      // if (delConfirmed) {
      //   const user = userModel.findOne({ id: req.params.id })

      //   userModel.remove(user)
  
      //   db.saveDatabase(err => {
      //     if (err) {
      //       return res.status(500).send('Could not delete user')
      //     }
  
      //     return res.redirect('/')
      //   });
      // }
      

    });

    router.get('/login', (req, res, next) => {
      res.render('login_form')
    });

    router.post('/login', (req, res, next) => {
      const { email } = req.body;
      const user = userModel.findOne({ email: email })
      
      let error = null;

      if (user === null || user.password !== req.body.password) {
        error = 'Invalid credetials';
        return res.status(400).render('login_form', { error, email });
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