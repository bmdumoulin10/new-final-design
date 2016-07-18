(function(){
  angular.module('myGroceryListMODULE', [])
  .controller('myGroceryListCtrl', myGroceryListController)

  myGroceryListController.$inject = ['$state', '$window', 'userFactory']

  function myGroceryListController($state, $window, userFactory){
    var gCtrl = this
    gCtrl.title = "My Grocery List"

    userFactory.current()
      .then(function(responseData){
        console.log('mypantry controller login', responseData)
        gCtrl.user = responseData.data
        console.log('mypantry server results', gCtrl.user)
      })

    gCtrl.userGroceryList = []
    // var saveList = $window.localStorage.getItem('savedList')

    // gCtrl.enterItemNeeded = saveList === ''? []: saveList.split(',')

    gCtrl.newItem = ''

    gCtrl.myGroceryList = function(){
      gCtrl.user.groceryList.push(gCtrl.newItem)

      gCtrl.newItem = ''

      // $window.localStorage.setItem('savedList',gCtrl.enterItemNeeded)

      console.log(gCtrl.user.groceryList)
    }

    gCtrl.remove = function(index){
        gCtrl.user.groceryList.splice(index,1)
        console.log(gCtrl.user.groceryList)

        // $window.localStorage.setItem('savedList',gCtrl.enterItemNeeded)
    }

    gCtrl.saveGroceries = function(){
      console.log(gCtrl.user)
      userFactory.update(gCtrl.user)
        .then(function(responseData){
          console.log('Updated User Ingredients', responseData)
          $state.go('searchRecipes')
        })
    }
  }
}());
