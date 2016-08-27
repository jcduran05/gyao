app.config(function($stateProvider){

  $stateProvider.state('allShows', {
    url:'/all-shows',
    templateUrl: 'js/show/templates/shows.html',
    controller: 'ShowsCtrl',
    resolve: {
      allShows: function(showFactory){
        return showFactory.findAll();
      },
      userShows: function(userFactory){
        return userFactory.findUserShows();
      }
    }
  });

  $stateProvider.state('singleShow', {
    url:'/shows/:showId',
    templateUrl: 'js/show/templates/show.html',
    controller: 'ShowCtrl',
    resolve: {
      singleShow: function(showFactory, $stateParams){
        return showFactory.findOne($stateParams.showId);
      }
    }
  });

});
