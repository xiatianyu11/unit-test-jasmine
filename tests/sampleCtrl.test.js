'use strict';

describe('Controller: sampleCtrl', function () {
	var scope, mockDataSvc, sampleCtrl;
	var passPromise = false;
	
	
	beforeEach(function(){
		module(function($provide){
		    $provide.factory('dataSvc', ['$q', function($q){
		    	function save(data){
		    		if(passPromise){
		    			return $q.when();
		    		} else {
		    			return $q.reject();
		    		}
			    }
			    return{
			    	save: save
			    };
		    }]);
		 });
		module('controllers');
	});
	
	
	beforeEach(inject(function($rootScope, $controller, dataSvc){
		  scope=$rootScope.$new();
		  mockDataSvc=dataSvc;
		  spyOn(mockDataSvc,'save').and.callThrough();
		  jasmine.createSpy('$setPristine')
		  sampleCtrl = $controller('sampleCtrl', {
		    $scope: scope, 
		    dataSvc: mockDataSvc
		  });
	}));
	
	it('should have assigned right pattern to numberPattern', function(){
	    expect(scope.numberPattern).toBeDefined();
	    expect(scope.numberPattern.test("100")).toBe(true);
	    expect(scope.numberPattern.test("100aa")).toBe(false);
	});
	
	
	it('should call save method on dataSvc on calling saveData', function(){
	    scope.bookDetails = {
	      bookId: 1, 
	      name: "Mastering Web application development using AngularJS", 
	      author:"Peter and Pawel"
	    };
	    scope.bookForm = {
	      $setPristine: jasmine.createSpy('$setPristine')
	    };
	    passPromise = true;
	    scope.saveData();
	    scope.$digest();
	    expect(mockDataSvc.save).toHaveBeenCalled();
	    expect(scope.bookDetails).toEqual({});
	    expect(scope.bookForm.$setPristine).toHaveBeenCalled();
	});
});
