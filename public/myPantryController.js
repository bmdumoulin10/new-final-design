(function(){
  angular.module('myPantryMODULE', [])
  .controller('myPantryCtrl', myPantryController)

  myPantryController.$inject = ['$state','$window']

  function myPantryController($state,$window){
    var pCtrl = this
    pCtrl.title = "My Pantry"
    pCtrl.userIngredients = []
  // adding and removing proteins

    var saveIngredient = $window.localStorage.getItem('pantryIngredients')

    pCtrl.enterIngredient = saveIngredient === null? []: saveIngredient.split(',')

    pCtrl.newIngredient = ''
    pCtrl.addIngredient = function(){
      pCtrl.enterIngredient.push(pCtrl.newIngredient)
      pCtrl.userIngredients.push(pCtrl.newIngredient)

      pCtrl.newIngredient = ''
      $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
      // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      console.log(pCtrl.enterIngredient)
      console.log(pCtrl.userIngredients)
    }

    pCtrl.removeIngredient = function(index){
        pCtrl.enterIngredient.splice(index,1)
        pCtrl.userIngredients.splice(index,1)

        $window.localStorage.setItem('pantryIngredients', pCtrl.enterIngredient)
        // $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
    }

  // adding and removing produce
    var saveProduce = $window.localStorage.getItem('pantryProduce')

    pCtrl.enterProduce = saveProduce === null? []: saveProduce.split(',')

    pCtrl.newProduce = ''

    pCtrl.addProduce = function(){
      pCtrl.enterProduce.push(pCtrl.newProduce)
      pCtrl.userIngredients.push(pCtrl.newProduce)

      pCtrl.newProduce = ''

      $window.localStorage.setItem('pantryProduce', pCtrl.enterProduce)
      $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      console.log(pCtrl.enterProduce)
      console.log(pCtrl.userIngredients)
    }

    pCtrl.removeProduce = function(index){
        pCtrl.enterProduce.splice(index,1)
        pCtrl.userIngredients.splice(index,1)

        $window.localStorage.setItem('pantryProduce', pCtrl.enterProduce)
        $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
    }

    // adding and removing grains
    var saveGrain = $window.localStorage.getItem('pantryGrains')

    pCtrl.enterGrain = saveGrain === null? []: saveGrain.split(',')

    pCtrl.newGrain = ''

    pCtrl.addGrain = function(){
      pCtrl.enterGrain.push(pCtrl.newGrain)
      pCtrl.userIngredients.push(pCtrl.newGrain)

      pCtrl.newGrain = ''

      $window.localStorage.setItem('pantryGrains', pCtrl.enterGrain)
      $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      console.log(pCtrl.enterGrain)
      console.log(pCtrl.userIngredients)
    }

    pCtrl.removeGrain = function(index){
        pCtrl.enterGrain.splice(index,1)
        pCtrl.userIngredients.splice(index,1)

        $window.localStorage.setItem('pantryGrains', pCtrl.enterGrain)
        $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
    }

    // adding and removing dairy
    var saveDairy = $window.localStorage.getItem('pantryDairy')

    pCtrl.enterDairy = saveDairy === null? []: saveDairy.split(',')

    pCtrl.newDairy = ''

    pCtrl.addDairy = function(){
      pCtrl.enterDairy.push(pCtrl.newDairy)
      pCtrl.userIngredients.push(pCtrl.newDairy)

      pCtrl.newDairy = ''

      $window.localStorage.setItem('pantryDairy', pCtrl.enterDairy)
      $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
      console.log(pCtrl.enterDairy)
      console.log(pCtrl.userIngredients)
    }

    pCtrl.removeDairy = function(index){
        pCtrl.enterDairy.splice(index,1)
        pCtrl.userIngredients.splice(index,1)

        $window.localStorage.setItem('pantryDairy', pCtrl.enterDairy)
        $window.localStorage.setItem('pantryIngredients', pCtrl.userIngredients.join(',') )
    }
  }

}());
