const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser( (user,done) => {
  done(null, user.id)
})

passport.deserializeUser( (id,done) => {
  User.findById(id)
  .then( (user) => {
    done(null, user)
  })
})

passport.use(
    new GoogleStrategy({
    //options for the GoogleStrategy
    callbackURL: '/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //does user already exist in DB?
    User.findOne({googleId: profile.id}).then( (currentUser) => {
      if(currentUser){
        //user already exists
        console.log('Current user is: ', currentUser)
        done(null, currentUser)
      } else {
        //create new user in DB
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save()
        .then( (newUser) => {
          console.log('New user saved: ', newUser)
          done(null, newUser)
        })
      }
    })
  })
)
