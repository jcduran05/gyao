app.config(function($stateProvider){
  $stateProvider.state('userShows', {
    url:'/my-shows',
    templateUrl: 'js/user/templates/user.shows.html',
    controller: 'UserCtrl',
    resolve: {
      userShows: function(userFactory){
        return userFactory.findUserShows();
      }
    }
  });
});
