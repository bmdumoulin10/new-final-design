// Database setup
var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/??')

var userSchema = mongoose.Schema({

  firstName           : String,
  lastName            : String,
  dob                 : Date,
  email               : String,
  username            : {type : String, required : true, unique : true},
  password            : {type : String, required : true},
  pantryIngredients   : [String],
  groceryList         : [String],
  cookbook            : [{
    name : String,
    directions : String
  }]
})

var User = mongoose.model('User', userSchema)

module.exports = User
