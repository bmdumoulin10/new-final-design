(function(){
  angular.module('homeMODULE', [])
    .controller('homeCtrl', homeController)

    homeController.$inject = ['$http', '$state', 'userFactory']

    function homeController($http, $state, userFactory){
      var hCtrl = this

      // Instantiating the newUser object
      hCtrl.newUser = {}

      hCtrl.createUser = function(){
        userFactory.create(hCtrl.newUser)
        // $http.post('/signup', hCtrl.newUser)
        .then(function(returnData){
          console.log('3', returnData)
          userFactory.userId = returnData.data.userId
          $state.go('myPantry')
        }, function(err){
          if(err){
            console.log('Error Signing In:', err)
          }
        })
      }

      hCtrl.oldUser = {}

      hCtrl.login = function(){
        userFactory.login(hCtrl.oldUser)
            // $http({
            //     method : 'POST',
            //     url    : '/login',
            //     data   : hCtrl.oldUser
            // })
            .then(function(returnData){
              console.log('login', returnData)

                if ( returnData.data.success ){
                  userFactory.userId = returnData.data.userId
                  $state.go('myPantry')
                } else {
                  console.log(returnData)
                }
            })
        }

//  -=-=-=-=-=-=-=-=-=-=-=- closing tags -=-=-=-=-=-=-=-=-=-=-=-
  }
}());
