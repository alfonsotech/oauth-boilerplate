const express = require('express')
const app = express()
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const PORT = 5000

app.set('view engine', 'ejs')

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to MongoDB.');
})

//set up routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})
