app.factory('showFactory', function($http, $log) {
  var Show = {};

  Show.findAll = function() {
    return $http.get('/api/shows')
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  };

  Show.findOne = function(showId) {
    return $http.get('/api/shows/' + showId)
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
    .catch($log.error);
  }

  Show.addToMyShows = function(showId) {
    return $http.post('/api/user/shows/add/' + showId)
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  }

  Show.scrapeLinks = function(showId) {
    return $http.get('/api/shows/scrape/' + showId)
    .then(function(response) {
      return response.data;
    })
    .catch($log.error);
  }

  return Show;
});
