(function(){
  angular.module('homeMODULE', [])
    .controller('homeCtrl', homeController)

    homeController.$inject('$http')
    
    function homeController($http){
      var hCtrl = this

      // Instantiating the newUser object
      hCtrl.newUser = {}

      hCtrl.createUser = function(){
        console.log(hCtrl.newUser)
        $http.post('/api/v1/users', hCtrl.newUser)
      }
    }
}());
