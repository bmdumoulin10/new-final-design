(function(){
  angular.module('myCookBookMODULE',[])
  .controller('myCookBookCtrl', myCookBookController)

  myCookBookController.$inject = ['$state', '$window', 'userFactory']

  function myCookBookController($state, $window, userFactory){
    var cCtrl = this
    cCtrl.title = "My Cookbook"

    userFactory.current()
      .then(function(responseData){
        console.log('cookbook controller login', responseData)
        cCtrl.user = responseData.data
        console.log('cookbook server results', cCtrl.user)
      })

    cCtrl.cookbook = [{
      name: '',
      directions: ''
    }]

    cCtrl.newName = ''
    cCtrl.newDirections = ''

    cCtrl.addRecipe = function(){
      if(cCtrl.newName !== '' && cCtrl.newDirections !== ''){
      cCtrl.user.cookbook.push({
          name: cCtrl.newName,
          directions: cCtrl.newDirections
      })}
      else{
          alert('Please complete both fields in order to add a new recipe')
      }

      cCtrl.newName = ''
      cCtrl.newDirections = ''

      console.log(cCtrl.user.cookbook)
    }

    cCtrl.removeRecipe = function(index){
        cCtrl.user.cookbook.splice(index,1)
    }

    cCtrl.saveCookbook = function(){
      console.log(cCtrl.user)

      userFactory.update(cCtrl.user)
        .then(function(responseData){
          console.log('Updated User cookbook', responseData)
          $state.go('searchRecipes')
        })
    }
    // =-=-=-=-=-=-=-=-=-=-=-=-=-closing tags=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  }
}());
