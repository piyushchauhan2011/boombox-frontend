function ArtistCtrl(
  $scope,
  $stateParams,
  $http,
  $cookies
) {
  $scope.artist = {};

  $scope.user = $cookies.getObject('user');

  $http.get('/api/artists/' + $stateParams.artistUUID)
    .then(function(artist) {
      $scope.artist = artist.data;
      $http.get('/api/users/' + $scope.user.userUUID + '/artists/' + $scope.artist.artistID)
        .then(function(artist) {
          $scope.artist.weight = artist.data.weight;
        });
    });

  $scope.selectedTag = "";
  $scope.tags = [];
  $http.get('/api/tags/index')
    .then(function(tags) {
      $scope.tags = tags.data;
    });

  $scope.startListening = function() {
    $http.put('/api/users/' + $scope.user.userUUID + '/artists/' + $scope.artist.artistID + '/listen')
      .then(function(artist) {
        $scope.artist.weight = artist.data.weight;
      });
  };

  $scope.assignTag = function() {
    $http.put('/api/users/' + $scope.user.userUUID + '/artists/' + $scope.artist.artistID + '/assign_tag/' + $scope.selectedTag.tagID)
      .then(function(artist) {
        $scope.artist = artist.data;
        $http.get('/api/users/' + $scope.user.userUUID + '/artists/' + $scope.artist.artistID)
          .then(function(artist) {
            $scope.artist.weight = artist.data.weight;
          });
        $scope.selectedTag = "";
      });
  }
}

ArtistCtrl.$inject = [
  '$scope',
  '$stateParams',
  '$http',
  '$cookies',
];

module.exports = ArtistCtrl;