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
const validateUserDataMW = require('../middlewares/validateUserDataMW');
const createUserMW = require('../middlewares/createUserMW');
const loginUserMW = require('../middlewares/loginUserMW');
const setupSignupErrorsMW = require('../middlewares/setupSignupErrorsMW');

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
    router.get('/users',
      getUsersMW(objRepo),
      renderMW('users/index')
    );

    router.get('/users/new',
      setupSignupErrorsMW(),
      renderMW('users/register_form')
    );

    router.post('/users',
      validateUserDataMW(objRepo),
      createUserMW(objRepo),
      saveDBMW(objRepo),
      loginUserMW(),
      (req, res) => {
        console.log('redirecting to root...')
        res.redirect('/');
      }
    );

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