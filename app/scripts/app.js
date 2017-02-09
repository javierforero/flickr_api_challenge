(function () {
  angular.module('flickrChallenge', []);

  // Main controller where my scripts will be
  function MainCtrl ($scope, $http) {


    $scope.pictures = {};

    var searchText = "Milky+Way+Galaxy";

    var API_KEY = "089063c49f6c8706a04b70f8a1f2abb2";
    var url = "https://api.flickr.com/services/rest/?" +
      "method=flickr.photos.search&" +
      "&text=" + searchText +
      "&content_type=1" +
      "&safe_search=1" +
      "&format=json" +
      "&nojsoncallback=1" +
      "&api_key=" + API_KEY;

    // Flickr API documentation for flickr.photos.search request https://www.flickr.com/services/api/flickr.photos.search.html

    $scope.getPhotos = function() {
      console.log("here");
      $http({
        url: url,
        type: 'GET',
        dataType: 'json'
          //TODO Parse this data to get the info we need for displaying the photos
          //TODO I would like to see a grid of the photos as small thumbnails since we want the page to load as quickly as possible
          //TODO When the user clicks on a thumbnail, we should load the original photo for the user to see
          //TODO IMPORTANT! This documentation will help you build the photo urls from the data response: https://www.flickr.com/services/api/misc.urls.html
          //TODO I prefer when we show the original photo, we don't have to navigate away from the page and force the user to click the back button when done (hint: Ajax, Modal)
          //EXTRA_CREDIT Make this look good!
      }).then(function(response) {
        console.log(response.data.photos.photo[0]);
        setPictures(response.data.photos.photo[0]);
      }, function(error) {
        console.log(error);
      });

    };

    var setPictures = function(obj) {
      $scope.pictures = obj;
    };

  }

  angular
    .module('flickrChallenge')
    .controller('MainCtrl', MainCtrl);

})();
