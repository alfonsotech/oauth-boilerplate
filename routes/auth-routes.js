const router = require('express').Router()
const passport = require('passport')
// routes for /auth/login
router.get('/login', (req, res) => {
  res.render('login', {user: req.user})
})

router.get('/logout', (req, res) => {
  //handle with passport
  req.logout()
  res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
  scope:['profile']
}))

router.get('/twitter', (req, res) => {
  //handle with passport
  res.send('Login in with twitter')
})

//callback rediect paths
router.get('/google/redirect', passport.authenticate('google') ,(req, res) => {
  // res.send(req.user)
  res.redirect('/profile/')
})

module.exports = router
