app.factory('showFactory', function($http, $log) {
  var Shows = {};

  Shows.findAll = function() {
    return $http.get('/api/shows')
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  };

  Shows.findOne = function(showId) {
    return $http.get('/api/shows/' + showId)
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
    .catch($log.error);
  }

  Shows.addToMyShows = function(showId) {
    return $http.post('/api/user/shows/add/' + showId)
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  }

  return Shows;
});
