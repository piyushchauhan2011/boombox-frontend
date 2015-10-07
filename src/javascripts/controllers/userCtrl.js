function UserCtrl(
  $scope,
  $stateParams,
  $state,
  $http
) {
  $scope.user = {};
  $http.get('/api/users/' + $stateParams.userUUID)
    .then(function(user) {
      $scope.user = user.data;
    });

  $scope.recommendations = {
    bySum: [],
    byNumber: [],
    byTags: []
  };

  $scope.selectedTag = "";
  $scope.tags = [];
  $http.get('/api/tags/index')
    .then(function(tags) {
      $scope.tags = tags.data;
    });

  $http.get('/api/users/' + $stateParams.userUUID + '/top_5_by_sum')
    .then(function(artists) {
      $scope.recommendations.bySum = artists.data;
      $scope.recommendations.bySum.forEach(function(artist) {
        $http.get('/api/artists/byID/' + artist.artistID)
          .then(function(response) {
            artist.name = response.data.name;
          });
      });
    });
  $http.get('/api/users/' + $stateParams.userUUID + '/top_5_by_number')
    .then(function(artists) {
      $scope.recommendations.byNumber = artists.data;
      $scope.recommendations.byNumber.forEach(function(artist) {
        $http.get('/api/artists/byID/' + artist.artistID)
          .then(function(response) {
            artist.name = response.data.name;
          });
      });
    });

  $scope.recommendationByTag = function() {
    $http.get('/api/users/' + $stateParams.userUUID + '/top_5_by_tags/' + $scope.selectedTag.tagID)
      .then(function(artists) {
        $scope.recommendations.byTags = artists.data;
      });
  };

  $scope.viewArtist = function(artist) {
    $http.get('/api/artists/byID/' + artist.artistID)
      .then(function(artist) {
        if(artist.data._id) {
          $state.go('artists.show', { artistUUID: artist.data._id.$oid });
        } else {
          $state.go('artists.show', { artistUUID: artist.data.id });
        }
      });
  };

  $scope.viewFriend = function(friend) {
    $state.go('users.show', { userUUID: friend.id });
  };
}

UserCtrl.$inject = [
  '$scope',
  '$stateParams',
  '$state',
  '$http',
];

module.exports = UserCtrl;