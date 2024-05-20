// dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('./bread') // !NEw Changes

// schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { toJSON: { virtuals: true } })

// Virtual's
bakerSchema.virtual('breads', { // !NEw Changes
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker



