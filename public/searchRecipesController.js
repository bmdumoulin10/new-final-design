(function(){
  angular.module('searchRecipesMODULE', [])
  .controller('searchRecipesCtrl', searchRecipesController)

  searchRecipesController.$inject = ['$state', '$http', '$window', 'userFactory']

  function searchRecipesController($state, $http, $window, userFactory){
    var sCtrl = this
    sCtrl.search = ''
    var pantrySearch = $window.localStorage.getItem('pantryIngredients')
    var apiEndpoint = 'http://food2fork.com/api/search?key={ENTER KEY}&q='
    sCtrl.title = "Search Recipes"
    sCtrl.recipeIndex = []

      sCtrl.searchRecipes = function(){
        console.log('searching for recipes....');

        $http.get(apiEndpoint + encodeURIComponent(sCtrl.search))
          //.then(success, oops)
          .then(function(response){
            sCtrl.recipeIndex = response.data.recipes
          }, function(error){
            console.error(error)
        })
      sCtrl.search = ''
      }

      sCtrl.searchRecipesByPantry = function(){
        console.log('searching for recipes....');

        $http.get(apiEndpoint + encodeURIComponent(pantrySearch))
          //.then(success, oops)
          .then(function(response){
            sCtrl.recipeIndex = response.data.recipes
          }, function(error){
            console.error(error)
        })
      }
  }

}());
