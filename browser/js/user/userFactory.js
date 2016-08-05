app.factory('userFactory', function($http, $log) {
  var User = {};

  User.addShow = function(showId) {
  return $http.post('/api/user/shows/add/' + showId)
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  };

  User.findUserShows = function() {
  return $http.get('/api/user/shows')
    .then(function(response) {
      console.log(response);
      return response.data;
    })
    .catch($log.error);
  };

  return User;
});
