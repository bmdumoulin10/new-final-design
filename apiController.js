var request = require('request')

var endpoint = 'http://api.yummly.com/v1/api/recipes?_app_id=4fc0c545&_app_key=2b832893729aab6d6d0959420edf65ba&q='

module.exports = {
  yummlyCtrl: {
    all: function(req, res) {
      request(endpoint, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body)
          res.json(body)
        }
      })
    }
  }
}
