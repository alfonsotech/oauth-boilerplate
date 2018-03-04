const express = require('express')
const app = express()
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const PORT = 5000

app.set('view engine', 'ejs')

//set up routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, function() {
  console.log("Listening on port:", PORT);
})
