const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
avatar: {type: String},
favoriteTrails: [{type: String}] // Stores array of googlePlaceIds (ie: favorited)
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel