const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
// const bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  res.render('Index',
    {
      breads: Bread,
      title: 'Index Page'
    }
  )
  // res.send(Bread)
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread: Bread[req.params.arrayIndex]
    })
  } else {
    res.send(`<h1 style='color: red;'> 404! </h1>`)
  }
})

module.exports = breads
