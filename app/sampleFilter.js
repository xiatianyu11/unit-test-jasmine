angular.module('filters', [])
  .filter('num', function () {
        return function(input) {
            return parseInt(input, 10);
        }
  });
