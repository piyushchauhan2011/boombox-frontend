function ArtistCtrl(
  $scope,
  $stateParams
) {
  $scope.message = 'Artist Controller'
}

ArtistCtrl.$inject = [
  '$scope',
];

module.exports = ArtistCtrl;