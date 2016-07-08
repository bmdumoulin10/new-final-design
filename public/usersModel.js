var mongoose = require('mongoose')

var userSchema = mongoose.Schema({

  firstName           : String,
  lastName            : String,
  dob                 : Date,
  email               : String,
  username            : String,
  password            : String,
  pantryIngredients   : [String],
  groceryList         : [String],
  cookbook            : [{
    name : String,
    recipe : String
  }]
})

var User = mongoose.model('User', userSchema)

module.exports = User
