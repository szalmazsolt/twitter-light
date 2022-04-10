const auth = () => {

  return (req, res, next) => {
    console.log('Auth mw runs')
    if (typeof req.session.userId === 'undefined') {
      // You have to login first?? redirect('/login')
      console.log('Error!!!!!!!')
      return res.status(401).render('error');
    }

    console.log('Seems OK!!!')
    next();
  };
};

module.exports = auth;