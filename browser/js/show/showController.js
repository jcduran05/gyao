app.controller('ShowsCtrl', function($scope, $rootScope, $log, allShows) {
  $scope.shows = allShows;

  $scope.addToUserShows = function() {
    console.log($rootScope.user)
  }

});

app.controller('ShowCtrl', function($scope, $rootScope, $log, singleShow) {
  $scope.show = singleShow;
});
