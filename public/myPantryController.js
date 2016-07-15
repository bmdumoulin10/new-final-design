(function(){
  angular.module('myPantryMODULE', [])
  .controller('myPantryCtrl', myPantryController)

  myPantryController.$inject = ['$state','$window', 'userFactory', '$stateParams']

  function myPantryController($state,$window, userFactory, $stateParams){
    var pCtrl = this
    pCtrl.title = "My Pantry"
    pCtrl.userIngredients = []
  // adding and removing ingredients

    var saveIngredient = $window.localStorage.getItem('pantryIngredients')

    pCtrl.enterIngredient = saveIngredient === ''? []: saveIngredient.split(',')

    pCtrl.newIngredient = ''
    pCtrl.addIngredient = function(){
      pCtrl.enterIngredient.push(pCtrl.newIngredient)
      pCtrl.userIngredients.push(pCtrl.newIngredient)

      pCtrl.newIngredient = ''
      $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
      // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      // console.log(pCtrl.enterIngredient)
      console.log(pCtrl.userIngredients)
    }

    pCtrl.removeIngredient = function(index){
        pCtrl.enterIngredient.splice(index,1)
        pCtrl.userIngredients.splice(index,1)

        $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
        // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
        console.log(pCtrl.userIngredients)
    }

    // pCtrl.update = true

      userFactory.current()
        .then(function(responseData){
          console.log('mypantry controller login', responseData)
          pCtrl.user = responseData.data
          console.log('mypantry server results', pCtrl.user)
        })


    pCtrl.saveIngredients = function(){
      console.log(pCtrl.user)
      pCtrl.user.pantryIngredients = pCtrl.userIngredients

      userFactory.update(pCtrl.user)
        .then(function(responseData){
          console.log('Updated User Ingredients', responseData)
          $state.go('searchRecipes')
        })
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=closing tags =-=-=-=-=-=-=-=-=-=-=-=-
  }

}());
