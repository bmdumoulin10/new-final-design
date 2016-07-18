// Requiring Express
var
  express       = require('express')
  app           = express()
  session       = require('express-session')
  logger        = require('morgan')
  mongoose      = require('mongoose')
  path          = require('path')
  port          = process.env.PORT || 5050

module.exports = app

// Applying the middelware being used
app.use(logger('dev')) //This logs all incomming routes
app.use(express.static(path.join(__dirname, './public'))) //Serving the public files

// Setting up Express session
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
})

app.use(app.sessionMiddleware)
// End of Express session setup

// Start of Body-parser setup
var bodyParser = require('body-parser')

app.use(bodyParser.json()) //Parse all form data to json
app.use(bodyParser.urlencoded({extended:true})) //Allow URL encoded to be
// End of Body-parser setup

// Connecting to mongoose for users DB
mongoose.connect('mongodb://localhost/user',
  function(err){
    if(err){
      console.error('ERROR starting mongoose!', err)
    }
    else{
      console.log('Mongoose connected successfully')
    }
  })

// Passport Configuration
var
    User          = require('./public/usersModel.js')
    bcrypt        = require('bcryptjs')
    passport      = require('passport')
    LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done){
  done(null, user.id)
})
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

// Checking the DB for an existing user
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username}, function(err, user){
      if(err){return done(err)}
      if(!user){
        return done(null, false, { message: 'Incorrect username.'})
      }
      // If the user does exist, this checks to make sure it is the correct password that was enterred
      bcrypt.compare(password, user.password, function(error, response){
        if(response === true){
          return done(null, user)
        }
        else{
          return done(null, false)
        }
      })
    })
  }
))

app.isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  console.log('hi')
  res.redirect('/mypantry')
}

app.isAuthenticatedAjax = function(req, res, next){
  if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue
    return next()
  }
  // If the user is not logged in send an error
  res.send({error: 'not logged in'})
}

app.isSteveAuthenticated = function(req, res, next){
  if(req.isAuthenticated() && req.user.username === 'steve'){
    // MIddleware allows the execution chain to continue
    return next()
  }
  // If the user is not logged in, redirect to login page (Home page with modals)
  res.redirect('/')
}
// End of the Passport Configuration
//
// // Security middleware for signup, adding salt to passwords
// var midFunc = function(req, res, next){
//   console.log('Middleware!')
//   return next()
// }
//
// app.get('/works', midFunc, function( req, res ) {
//   console.log('Am I working?')
//   res.end()
// })

app.get('/',  function(req, res){
  console.log('Endpoint!')
  res.sendFile('main.html', {root: './public'})
})

app.post('/signup', function(req, res){
  bcrypt.genSalt(11, function(error, salt){
    bcrypt.hash(req.body.password, salt, function(hashError, hash){
      var newUser = new User({
        username            : req.body.username,
        password            : hash,
      })
      newUser.save(function(saveErr, user){
        if(saveErr){res.send({err: saveErr})}
        else{
          req.login(user, function(loginErr){
            if(loginErr){res.send({err: loginErr})}
            else{res.send({success: 'success', userId: user._id})}
          })
        }
      })
    })
  })
})

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(!user){
      return res.send({error: 'Something went wrong'});
    }
    req.login(user, function(err){
      if(err){return next(err);
      }
      return res.send({success: 'Success', userId: user._id})
    })
  })(req, res, next)
})

app.get('/currentuser', function(req, res, next){
  if(req.user){
    console.log(req.user)
    res.json(req.user)
  }

})

// app.get('/logout', function(req, res){
//   req.logout()
//   res.redirect('/')
// })

// app.get('/myPantry', app.isAuthenticated, function(req, res){
//   res.sendfile('/partials/myPantry.html', {root: './public'})
// })
//
// app.get('api/v1/users', app.isAuthenticatedAjax, function(req, res){
//   res.send({user: req.user})
// })

// User API routes
var userCtrl = require('./public/userController.js')

// app.get('/api/v1/users', userCtrl.get)
app.get('/api/v1/users/:id', userCtrl.get)
app.put('/api/v1/users/:id', userCtrl.update)
// app.post('/api/v1/users/:id', userCtrl.login)

// Listen on a specific port and check for an Error
app.listen(port, function(err){
  if(!err) console.log('Server is listening on port:' + port)
  if(err) console.log('Server Crashed!', err)
})
