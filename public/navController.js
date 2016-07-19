(function(){
  angular.module('navMODULE', [])
  .controller('navCtrl', navController)

  navController.$inject = ['$state','$window', 'userFactory']

  function navController($state, $window, userFactory){
    var nCtrl = this
    nCtrl.title = "Main.html Controller"
    nCtrl.user = userFactory
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=closing tags =-=-=-=-=-=-=-=-=-=-=-=-
  }

}());
