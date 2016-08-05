app.controller('UserCtrl', function($scope, $rootScope, $log, userShows) {
  $scope.userData = userShows;

  $scope.addToUserShows = function() {
    console.log($rootScope.user)
  }

});
