function ArtistsCtrl(
  $scope,
  $http
) {
  $scope.artists = [];
  $http.get('/api/artists/index')
    .then(function(artists) {
      $scope.artists = artists.data;
    });
}

ArtistsCtrl.$inject = [
  '$scope',
  '$http',
];

module.exports = ArtistsCtrl;