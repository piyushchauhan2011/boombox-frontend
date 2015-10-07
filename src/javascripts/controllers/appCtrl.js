function AppCtrl(
  $scope,
  $rootScope,
  $http,
  $state,
  $cookies
) {

  $scope.loadUser = function() {
    $http.get('/api/users/byID/' + $scope.userID)
      .then(function(user) {
        $cookies.putObject('user', { userID: user.data.userID, userUUID: user.data._id.$oid });
        $state.go('users.show', { userUUID: user.data._id.$oid });
      });
  }
}

AppCtrl.$inject = [
  '$scope',
  '$rootScope',
  '$http',
  '$state',
  '$cookies',
];

module.exports = AppCtrl;