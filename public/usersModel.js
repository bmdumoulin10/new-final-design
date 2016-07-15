// Database setup
var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/partials/myPantry')

var userSchema = mongoose.Schema({
  username            : {type : String, required : true, unique : true},
  password            : {type : String, required : true},
  pantryIngredients   : [String],
  groceryList         : [String],
  cookbook            : [{
    name : String,
    directions : String
  }]
})

var User = mongoose.model('user', userSchema)

module.exports = User
