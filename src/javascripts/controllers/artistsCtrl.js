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

  $scope.selectedTag = "";
  $scope.tags = [];
  $http.get('/api/tags/index')
    .then(function(tags) {
      $scope.tags = tags.data;
    });

  $scope.recommendations = {
    bySum: [],
    byNumber: [],
    byTags: []
  };

  $scope.recommendationByTag = function() {
    $http.get('/api/artists' + '/top_5_by_tags/' + $scope.selectedTag.tagID)
      .then(function(artists) {
        $scope.recommendations.byTags = artists.data;
      });
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