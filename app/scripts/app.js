(function () {
  angular.module('flickrChallenge', []);

  // Main controller where my scripts will be
  function MainCtrl ($scope) {
    $scope.test = function () {
      alert("hello!");
    }
  }

  angular
    .module('flickrChallenge')
    .controller('MainCtrl', MainCtrl);

})();
