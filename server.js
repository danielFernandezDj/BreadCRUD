
// DEPENDENCIES & CONFIGURATION
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
  

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

// 404 Page
app.get('*', (req, res) => {
    res.status(404).send('404') 
})
