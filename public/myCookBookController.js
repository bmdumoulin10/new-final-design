(function(){
  angular.module('myCookBookMODULE',[])
  .controller('myCookBookCtrl', myCookBookController)

  myCookBookController.$inject = ['$state', '$window', 'userFactory']

  function myCookBookController($state, $window, userFactory){
    var cCtrl = this
    cCtrl.title = "My Cookbook"
    var saveCookbook = $window.localStorage.getItem('savedCookbook')

    cCtrl.enterRecipe = saveCookbook === null? []: JSON.parse(saveCookbook)

    cCtrl.newName = ''
    cCtrl.newDirections = ''

    cCtrl.addRecipe = function(){
      if(cCtrl.newName !== '' && cCtrl.newDirections !== ''){
      cCtrl.enterRecipe.push({
          name: cCtrl.newName,
          directions: cCtrl.newDirections
      })}
      else{
          alert('Please complete both fields in order to add a new recipe')
      }

      cCtrl.newName = ''
      cCtrl.newDirections = ''

      $window.localStorage.setItem('savedCookbook',JSON.stringify(cCtrl.enterRecipe))

      console.log(cCtrl.enterRecipe)
    }

    cCtrl.removeRecipe = function(index){
        cCtrl.enterRecipe.splice(index,1)

        $window.localStorage.setItem('savedCookbook',JSON.stringify(cCtrl.enterRecipe))
    }
  }
}());
