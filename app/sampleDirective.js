angular.module('directives', [])
	.directive('sampleDirective', function($timeout, dateFilter) {
	var linker = function(scope, element, attrs) {
		var format = "h:mm:ss a", timeoutId;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		function updateLater() {
			updateTime();
			timeoutId = $timeout(function() {
				updateLater();
			}, 1000);
		}

		element.bind('$destroy', function() {
			$timeout.cancel(timeoutId);
		});

		updateLater(); // kick off the UI update process.
	}

	return {
      restrict: 'E',
      link: linker
    };
});
