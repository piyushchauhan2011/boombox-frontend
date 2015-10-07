function ArtistsCtrl(
  $scope,
  $http,
  $state
) {
  $scope.artists = [];
  $http.get('/api/artists/index')
    .then(function(artists) {
      $scope.artists = artists.data;
    });

  $scope.recommendations = {
    bySum: [],
    byNumber: [],
    byTags: []
  };

  $http.get('/api/artists' + '/top_5_by_sum')
    .then(function(artists) {
      $scope.recommendations.bySum = artists.data;
      // $scope.recommendations.bySum.forEach(function(artist) {
      //   $http.get('/api/artists/byID/' + artist.artistID)
      //     .then(function(response) {
      //       artist.name = response.data.name;
      //     });
      // });
    });
  $http.get('/api/artists' + '/top_5_by_number')
    .then(function(artists) {
      $scope.recommendations.byNumber = artists.data;
      // $scope.recommendations.byNumber.forEach(function(artist) {
      //   $http.get('/api/artists/byID/' + artist.artistID)
      //     .then(function(response) {
      //       artist.name = response.data.name;
      //     });
      // });
    });
  $http.get('/api/artists' + '/top_5_by_tags/' + 23)
    .then(function(artists) {
      $scope.recommendations.byTags = artists.data;
    });

  $scope.viewArtist = function(artist) {
    if(artist._id) {
      $state.go('artists.show', { artistUUID: artist._id.$oid });
    } else {
      $state.go('artists.show', { artistUUID: artist.id });
    }
  };
}

ArtistsCtrl.$inject = [
  '$scope',
  '$http',
  '$state',
];

module.exports = ArtistsCtrl;