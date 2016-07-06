(function(){
  angular.module('homeMODULE', [])
    .controller('homeCtrl', homeController)

    function homeController(){
      var hCtrl = this
      hCtrl.title = "Home Controller"
    }
}());
