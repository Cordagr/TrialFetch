const mongoose = require('mongoose')

const userSchema = new mongoose.Shema({
name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
avatar: {type: String},
favoriteTrails: [{type: String}] // Stores array of googlePlaceIds (ie: favorited)
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel