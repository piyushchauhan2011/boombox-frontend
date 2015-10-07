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
      url: '/:artistUUID',
      templateUrl: 'artists/show.html',
      controller: 'ArtistCtrl'
    })
    .state('users', {
      url: '/users',
      abstract: true,
      template: '<ui-view></ui-view>'
    })
    .state('users.index', {
      url: '',
      templateUrl: 'users/index.html',
      controller: 'UsersCtrl'
    })
    .state('users.show', {
      url: '/:userUUID',
      templateUrl: 'users/show.html',
      controller: 'UserCtrl'
    });

  // $locationProvider.html5Mode(true);
}

Config.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
];

module.exports = Config;