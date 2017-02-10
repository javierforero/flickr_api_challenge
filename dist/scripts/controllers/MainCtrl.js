(function(){
  function MainCtrl($scope, $http, $uibModal) {

    $scope.searchError = null;
    $scope.searchBarError = null;

    var searchText = "Milky+Way+Galaxy";

    var API_KEY = "089063c49f6c8706a04b70f8a1f2abb2";

     var setPictures = function(arrayPics) {
        $scope.pictures = arrayPics;
     };

    // Flickr API documentation for flickr.photos.search request https://www.flickr.com/services/api/flickr.photos.search.html

    $scope.getPhotos = function() {
      if($scope.text) {

        var searchText = $scope.text.split(' ').join('+');

        var url = "https://api.flickr.com/services/rest/?" +
          "method=flickr.photos.search&" +
          "&text=" + searchText +
          "&content_type=1" +
          "&safe_search=1" +
          "&format=json" +
          "&privacy_filter=1"+
          "&nojsoncallback=1" +
          "&api_key=" + API_KEY;

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

          if(response.data.photos.photo.length > 0) {

            setPictures(response.data.photos.photo);

          } else {

            $scope.searchError = "Can't find images with these terms. Try again!";
          }

        }, function(error) {

          $scope.searchError = "oops something went wrong";
        });
    } else {
      $scope.searchBarError = "Oops you forgot to type something in";
    }
    };

    $scope.createUrl = function(farmId, serverId, id, secret) {

      var url = "https://farm"+ farmId +
        ".staticflickr.com/"+ serverId +
        "/"+id+"_"+secret+".jpg";
        return url;
    };

    $scope.openImage = function(currentImage) {

      $uibModal.open({
       templateUrl: '/templates/imageModal.html',
       resolve: {
         imageSrcToUse: function() {
           return currentImage;
         }
       },
       controller: [
         '$scope', 'imageSrcToUse',
         function($scope, imageSrcToUse) {
           $scope.currentImage = imageSrcToUse;
         }
       ]
     });
    };




  }
  angular
    .module('flickrChallenge')
    .controller('MainCtrl',['$scope','$http','$uibModal', MainCtrl]);
})();
