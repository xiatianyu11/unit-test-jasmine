var testTime = function(timeString){
	var regex = /^([0-1]?[0-9])\:[0-5][0-9]:[0-5][0-9]\s*[ap]m$/i;
   var match = timeString.match( regex );
   if ( match ) {
     var hour  = parseInt( match[1] );
     if ( !isNaN( hour) && hour <= 11 ) {
       return true;
     }
   }
   return false;
}

var customMatchers = {
	toBeTime: function() {
		return {
			compare: function(actual, expected) {
				var result = {};
				 result.pass = testTime(actual);
                 result.message = 'sorry you are not a time   ' +  actual;
                 return result;
			}
		}
	}
}

var mockDateFilter = function(){
	return "5:23:34 PM";
}

describe('Directive: sample', function () {
	var element;

	beforeEach(function() {
		jasmine.addMatchers(customMatchers);
	});


    // load the controller's module
    beforeEach(function(){
  	  module(function($provide){
  	    $provide.value('dateFilter', mockDateFilter);
  	  });
  	  module('directives');
  	});

  // Initialize the controller and a mock scope
    beforeEach(inject(function($rootScope, $compile,  $timeout, dateFilter) {
    	var $scope = $rootScope.$new();
	  	element = $compile('<sample-directive></sample-directive>')($scope);
	  	$scope.$apply();

    }));

  it('should make hidden element visible', function () {
	    expect(element.html()).toBeTime();
  });


});
