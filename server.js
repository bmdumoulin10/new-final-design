// Declaring global variables and requiring the methods being used
var
  express       = require('express')
  app           = express()
  session       = require('express-session')
  bodyParser    = require('body-parser')
  logger        = require('morgan')
  mongoose      = require('mongoose')
  path          = require('path')
  port          = process.env.PORT || 5050

// Setting up Express session
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
})
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

// Applying the middelware being used
app.use(logger('dev')) //This logs all incomming routes
app.use(bodyParser.json()) //Parse all form data to json
app.use(bodyParser.urlencoded({extended:true})) //Allow URL encoded to be pasred
app.use(express.static(path.join(__dirname, './public'))) //Serving the public files
app.use(app.sessionMiddleware)

// User API routes
var userCtrl = require('./public/userController.js')

app.get('/api/v1/users', userCtrl.get)
app.get('/api/v1/users/:id', userCtrl.get)

app.post('/api/v1/users', userCtrl.upsert)

// Listen on a specific port and check for an Error
app.listen(port, function(err){
  if(!err) console.log('Server is listening on port:' + port)
  if(err) console.log('Server Crashed!', err)
})
