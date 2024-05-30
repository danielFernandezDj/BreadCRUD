// dependencies
const express = require('express')
const baker = express.Router()
const BakerData = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// INDEX
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

// SEEDS
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(() => {
            res.redirect('/breads')
        })
        .catch((err) => {
            res.status(400).json({
                message: 'Seed unsuccessful',
                error: err
            })
        })
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 5 }
        })
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
        .then(deletedBaker => {
            res.status(303).redirect('/breads')
        })
})


// export
module.exports = baker                    
