const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( 
    {
        username: String,
        password: String,
        email: String,
        level: Number,
        exp: Number,
        racesWon: Number
    }
)

module.exports = mongoose.model('User', userSchema)