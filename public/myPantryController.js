(function(){
  angular.module('myPantryMODULE', [])
  .controller('myPantryCtrl', myPantryController)

  myPantryController.$inject = ['$state','$window', 'userFactory']

  function myPantryController($state,$window, userFactory, $stateParams){
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

    // var saveIngredient = $window.localStorage.getItem('pantryIngredients')

    // pCtrl.enterIngredient = saveIngredient === ''? []: saveIngredient.split(',')

    pCtrl.newIngredient = ''

    pCtrl.addIngredient = function(){
      // pCtrl.enterIngredient.push(pCtrl.newIngredient)
      pCtrl.user.pantryIngredients.push(pCtrl.newIngredient)

      pCtrl.newIngredient = ''
      // $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
      // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      // console.log(pCtrl.enterIngredient)
      console.log(pCtrl.user.pantryIngredients)
    }

    pCtrl.removeIngredient = function(index){
        // pCtrl.enterIngredient.splice(index,1)
        pCtrl.user.pantryIngredients.splice(index,1)

        // $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
        // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
        console.log(pCtrl.user.pantryIngredients)
    }



    pCtrl.saveIngredients = function(){
      console.log(pCtrl.user)
      // pCtrl.user.pantryIngredients = pCtrl.userIngredients

      userFactory.update(pCtrl.user)
        .then(function(responseData){
          console.log('Updated User Ingredients', responseData)
          $state.go('searchRecipes')
        })
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=closing tags =-=-=-=-=-=-=-=-=-=-=-=-
  }

}());
