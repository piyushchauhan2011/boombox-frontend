function UsersCtrl(
  $scope,
  $http,
  $state,
  $cookies
) {
  $scope.users = [];

  $scope.user = $cookies.getObject('user');

  $http.get('/api/users/index')
    .then(function(users) {
      $scope.users = users.data;
    });

  $scope.viewUser = function(user) {
    $state.go('users.show', { userUUID: user._id.$oid });
  }

  $scope.addFriend = function(user) {
    $http.put('/api/users/' + $scope.user.userUUID + '/add_friend/' + user.userID)
      .then(function(user) {
        console.log(user.data);
      });
  };
}

UsersCtrl.$inject = [
  '$scope',
  '$http',
  '$state',
  '$cookies',
];

module.exports = UsersCtrl;