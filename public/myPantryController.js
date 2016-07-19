(function(){
  angular.module('myPantryMODULE', [])
  .controller('myPantryCtrl', myPantryController)

  myPantryController.$inject = ['$state','$window', 'userFactory']

  function myPantryController($state,$window, userFactory){
    var pCtrl = this
    pCtrl.title = "My Pantry"

    userFactory.current()
      .then(function(responseData){
        console.log('mypantry controller login', responseData)
        pCtrl.user = responseData.data
        console.log('mypantry server results', pCtrl.user)
      })

    pCtrl.userIngredients = []

  // adding and removing ingredients
    pCtrl.newIngredient = ''

    pCtrl.addIngredient = function(){
      pCtrl.user.pantryIngredients.push(pCtrl.newIngredient)

      pCtrl.newIngredient = ''
      console.log(pCtrl.user.pantryIngredients)
    }

    pCtrl.removeIngredient = function(index){
        pCtrl.user.pantryIngredients.splice(index,1)
        console.log(pCtrl.user.pantryIngredients)
    }


  // Saving ingredients to the DB
    pCtrl.saveIngredients = function(){
      console.log(pCtrl.user)

      userFactory.update(pCtrl.user)
        .then(function(responseData){
          console.log('Updated User Ingredients', responseData)
          $state.go('searchRecipes')
        })
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=closing tags =-=-=-=-=-=-=-=-=-=-=-=-
  }

}());
