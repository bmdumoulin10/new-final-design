(function(){
  angular.module('searchRecipesMODULE', [])
  .controller('searchRecipesCtrl', searchRecipesController)

  searchRecipesController.$inject = ['$state', '$http', '$window', 'userFactory']

  function searchRecipesController($state, $http, $window, userFactory){
    var sCtrl = this
    sCtrl.title = "Search Recipes"

    userFactory.current()
      .then(function(responseData){
        sCtrl.user = responseData.data
      })

    sCtrl.search = ''
    // var apiEndpoint = 'http://food2fork.com/api/search?key=ENTER-API-KEY&q='
    var apiEndpoint = 'http://api.yummly.com/v1/api/recipes?_app_id=ENTER-ID-HERE&_app_key=ENTER-KEY-HERE&q='

    sCtrl.recipeIndex = []

      sCtrl.searchRecipes = function(){
        console.log('searching for recipes....');

        $http.get(apiEndpoint + encodeURIComponent(sCtrl.search) + '&maxResult=100')
          //.then(success, oops)
          .then(function(response){
            console.log(response)
            sCtrl.recipeIndex = response.data.matches
          }, function(error){
            console.error(error)
        })
      sCtrl.search = ''
      }

      sCtrl.searchRecipesByPantry = function(){
        console.log('searching for recipes....');
        var pantrySearch = sCtrl.user.pantryIngredients.join(', ')
        console.log(pantrySearch)

        $http.get(apiEndpoint + encodeURIComponent(pantrySearch) + '&maxResult=100')
          //.then(success, oops)
          .then(function(response){
            sCtrl.recipeIndex = response.data.matches
          }, function(error){
            console.error(error)
        })
      }
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=closing tags=-=-=-=-=-=-=-=-=-=-=-=-
  }

}());
