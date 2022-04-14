const updateUserMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {

    if (req.body.whatToChange === 'email') {
      console.log('Changing email')
      console.log('An email has been sent...')
    }

    if (req.body.whatToChange === 'password') {
      console.log('Changing password')
      console.log('An email has been sent with the code to change your password')
    }

    next();
  };
};

module.exports = updateUserMW;