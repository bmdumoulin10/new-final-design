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
          hCtrl.newUser.id = returnData.data.userId
          $state.go('myPantry')
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
                  $state.go('myPantry')
                } else {
                  console.log(returnData)
                }
            })
        }

      // hCtrl.logout = function(){
      //   userFactory.logout()
      // }
//  -=-=-=-=-=-=-=-=-=-=-=- closing tags -=-=-=-=-=-=-=-=-=-=-=-
  }
}());
