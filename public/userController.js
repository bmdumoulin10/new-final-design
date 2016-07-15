var
    User          = require('./usersModel.js')

module.exports = {

  get : function(req, res){

    //get specific users
    User.findOne({_id : req.params.id}, function(err, user){
      res.send(user)
    })
  },

  update : function(req, res){

    if(req.params.id){
      // Update existing user
      User.update({_id : req.params.id}, req.body, function(err, updated){
        if(err){
          return res.send(err)
        }
        res.json(updated)
      })
    }
    else{
      res.send('ID required')
      }
    }
  }
