var
    User          = require('./usersModel.js')
    bcrypt        = require('bcryptjs')
    passport      = require('passport')
    LocalStrategy = require('passport-local').Strategy

module.exports = {

  get : function(req, res){

    //get specific users
    User.findOne({_id : req.params.id}, function(err, user){
      res.send(user)
    })
  },

  upsert : function(req, res){

    if(req.params.id){
      // Update existing user
      User.update({_id : req.params.id}, req.body, function(err, updated){
        if(err){
          return res.send(err)
        }
        res.send(updated)
      })
    }
    else{
      // Create a new userCtrl
      var newUser = new User(req.body)

      newUser.save(function(err, doc){
        res.send(doc)
      })
    }
  },

  delete : function(req, res){

  }
}
