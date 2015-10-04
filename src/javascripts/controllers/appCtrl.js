function AppCtrl(
  $scope
) {
  $scope.message = 'App Controller';
}

AppCtrl.$inject = [
  '$scope',
];

module.exports = AppCtrl;