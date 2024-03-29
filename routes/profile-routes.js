const router = require('express').Router()

const authCheck = (req, res, next) => {
  if(!req.user) {
    //executes if user is not logged in
    res.redirect('/auth/login')
  } else {
    //if logged in, proceed to next function, which is sends/displays user profile view
    next()
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile', {user: req.user})
})

module.exports = router
