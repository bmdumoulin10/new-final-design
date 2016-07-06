// Declaring global variables and requiring the methods being used
var
  express       = require('express')
  app           = express()
  bodyParser    = require('body-parser')
  logger        = require('morgan')
  path          = require('path')
  apiRoutes     = require('./api-routes')
  port          = process.env.PORT || 5050

// Applying the middelware being used
app.use(logger('dev')) //This logs all incomming routes
app.use(bodyParser.json()) //Parse all form data to json
app.use(bodyParser.urlencoded({extended:true})) //Allow URL encoded to be pasred
app.use(express.static(path.join(__dirname, './public'))) //Serving the public files

// Listen on a specific port and check for an Error
app.listen(port, function(err){
  if(!err) console.log('Server is listening on port:' + port)
  if(err) console.log('Server Crashed!')
})
