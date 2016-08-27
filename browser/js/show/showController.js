app.controller('ShowsCtrl', function($scope, $rootScope, $log, allShows, userShows, showFactory) {
  $scope.shows = allShows;
  $scope.userData = userShows;

  $scope.addToMyShows = function(showId) {
    showFactory.addToMyShows(showId)
    .then(function() {
      // Show added. Consider displaying some notice
    });
  }

});

app.controller('ShowCtrl', function($scope, $rootScope, $log, $window, $timeout, singleShow, showFactory) {
  $scope.show = singleShow;
  $scope.loading = false;

  $scope.findLinks = function(showId) {
    $scope.loading = true;
    showFactory.scrapeLinks(showId)
    .then(function(showData) {
      return showData;
    })
    .then(function(showData) {
      // $timeout($scope.loading = false, 1000);
      // $scope.show = showData;
      $timeout($window.location.reload(), 5000);
      $scope.show = showData;
    })
  }
});
