angular.module('routerMODULE',['ui.router'])
  .config(configRouter)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']

  function configRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl as hCtrl'
      })
      .state('myPantry',{
        url: '/myPantry',
        templateUrl: 'partials/myPantry.html',
        controller: 'myPantryCtrl as pCtrl'
      })
      .state('searchRecipes',{
        url: '/searchRecipes',
        templateUrl: 'partials/searchRecipes.html',
        controller: 'searchRecipesCtrl as sCtrl'
      })
      .state('searchRecipes.recipeInfo', {
        templateUrl: 'partials/recipeInfo.html',
      })
      .state('myGroceryList',{
        url: '/myGroceryList',
        templateUrl: 'partials/myGroceryList.html',
        controller: 'myGroceryListCtrl as gCtrl'
      })
      .state('myCookBook',{
        url: '/myCookBook',
        templateUrl: 'partials/myCookBook.html',
        controller: 'myCookBookCtrl as cCtrl'
      })
    $urlRouterProvider.otherwise('/')
  }
