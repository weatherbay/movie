const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    
    price: {
        type: Number,
        default: 0
    },
    genre: {
        type: Number,
        default: 1
    },

    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    images: {
        type: Array,
        default: []
    }}, { timestamps: true })


movieSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        title: 5,
        description: 1,
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie }