function Config(
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      url: '/',
      templateUrl: 'app.html',
      controller: 'AppCtrl',
    })
    .state('artists', {
      url: '/artists',
      abstract: true,
      template: '<ui-view></ui-view>'
    })
    .state('artists.index', {
      url: '',
      templateUrl: 'artists/index.html',
      controller: 'ArtistsCtrl'
    })
    .state('artists.show', {
      url: '/:artistId',
      templateUrl: 'artists/show.html',
      controller: 'ArtistCtrl'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'users/index.html',
      controller: 'UsersCtrl'
    });

  // $locationProvider.html5Mode(true);
}

Config.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
];

module.exports = Config;