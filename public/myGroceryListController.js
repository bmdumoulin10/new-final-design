(function(){
  angular.module('myGroceryListMODULE', [])
  .controller('myGroceryListCtrl', myGroceryListController)

  myGroceryListController.$inject = ['$state', '$window']

  function myGroceryListController($state, $window){
    var gCtrl = this
    gCtrl.title = "My Grocery List"

    var saveList = $window.localStorage.getItem('savedList')

    gCtrl.enterItemNeeded = saveList === null? []: saveList.split(',')

    gCtrl.newItem = ''

    gCtrl.myGroceryList = function(){
      gCtrl.enterItemNeeded.push(gCtrl.newItem)

      gCtrl.newItem = ''

      $window.localStorage.setItem('savedList',gCtrl.enterItemNeeded)

      console.log(gCtrl.enterItemNeeded)
    }

    gCtrl.remove = function(index){
        gCtrl.enterItemNeeded.splice(index,1)
        console.log(gCtrl.enterItemNeeded)

        $window.localStorage.setItem('savedList',gCtrl.enterItemNeeded)
    }
  }
}());
