const getUsersMW = require('../middlewares/getUsersMW');
const getTweetsMW = require('../middlewares/getTweetsMW');
const getLoggedInUserMW = require('../middlewares/getLoggedInUserMW');
const renderMW = require('../middlewares/renderMW');
const authMW = require('../middlewares/authMW');
const getUserMW = require('../middlewares/getUserMW');
const createTweetMW = require('../middlewares/createTweetMW');
const saveDBMW = require('../middlewares/saveDBMW');
const getTweetMW = require('../middlewares/getTweetMW');
const correctTweetUserMW = require('../middlewares/correctTweetUserMW');
const updateTweetMW = require('../middlewares/updateTweetMW');
const deleteTweetMW = require('../middlewares/deleteTweetMW');
const validateUserDataMW = require('../middlewares/validateUserDataMW');
const createUserMW = require('../middlewares/createUserMW');
const loginUserMW = require('../middlewares/loginUserMW');
const setupSignupErrorsMW = require('../middlewares/setupSignupErrorsMW');
const getUserByIdMW = require('../middlewares/getUserByIdMW');
const updateUserMW = require('../middlewares/updateUserMW');
const deleteUserMW = require('../middlewares/deleteUserMW');
const correctUserMW = require('../middlewares/correctUserMW');
const logoutUserMW = require('../middlewares/logoutUserMW');
const getUserByEmailMW = require('../middlewares/getUserByEmailMW');
const checkCredentialsMW = require('../middlewares/checkCredentialsMW');
const addBioMW = require('../middlewares/addBioMW');
const getTweetsByUserMW = require('../middlewares/getTweetsByUserMW');
const updateBioMW = require('../middlewares/updateBioMW');

const createRouter = (objRepo) => {
  
  const { router, upload } = objRepo 

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
      authMW(objRepo),
      renderMW('tweets/tweet_form')
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
      correctTweetUserMW(),
      renderMW('edit_tweet_form')
    );
    
    // Update tweet
    router.patch('/tweets/:id',
      getTweetMW(objRepo),
      correctTweetUserMW(),
      updateTweetMW(objRepo),
      saveDBMW(objRepo),
      (req, res, next) => {
        res.redirect('/');
      });
    
    // Delete tweet
    router.delete('/tweets/:id', 
      getTweetMW(objRepo),
      correctTweetUserMW(),
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

    router.get('/users/:id',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo, { continueMwFlow: true }),
      getTweetsByUserMW(objRepo),
      renderMW('users/show')
    );

    router.get('/users/:id/edit',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      renderMW('users/edit')
    );

    router.patch('/users/:id',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      updateUserMW(objRepo),
      renderMW('users/show')
    );

    router.get('/users/:id/bio/new',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      renderMW('users/bio_form')
    );

    router.post('/users/:id/bio',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      addBioMW(objRepo),
      (req, res) => {
        res.redirect('/users/' + res.locals.user.id)
      }
    );

    router.patch('/users/:id/bio',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      updateBioMW(objRepo),
      (req, res) => {
        res.redirect('/users/' + res.locals.user.id)
      }
    );

    router.delete('/users/:id',
      getUserByIdMW(objRepo),
      correctUserMW(objRepo),
      deleteUserMW(objRepo),
      saveDBMW(objRepo),
      (req, res) => {
        res.redirect('/')
      }
    );

    router.post('/users/:id/upload',
      getUserByIdMW(objRepo),
      upload.single('profile_img'),
      (req, res, next) => {
        console.log(req.file)
        res.locals.user.profileData.img = req.file.path;
        console.log(res.locals);
        next();
      },
      // saveDBMW(objRepo),
      (req, res, next) => {
        res.redirect('/users/' + res.locals.user.id)
      }
      
    );

    router.get('/login',
      renderMW('login_form')
    );

    router.post('/login',
      getUserByEmailMW(objRepo),
      checkCredentialsMW(),
      loginUserMW(),
      (req, res, next) => {
        res.redirect('/')
      });

    router.get('/logout',
      logoutUserMW(),
      (req, res) => {
        res.redirect('/');
      }
    );
  
    return router;
  };



  
};


module.exports = createRouter;