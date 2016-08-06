app.controller('ShowsCtrl', function($scope, $rootScope, $log, allShows, showFactory) {
  $scope.shows = allShows;

  $scope.addToMyShows = function(showId) {
    showFactory.addToMyShows(showId)
    .then(function() {
      console.log('made it');
    });
  }

});

app.controller('ShowCtrl', function($scope, $rootScope, $log, singleShow) {
  $scope.show = singleShow;
});
