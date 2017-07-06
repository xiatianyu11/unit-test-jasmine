'use strict';

describe('Provider: sampleProvider', function () {
	var sampleProviderObj, anotherProviderObj, appConstantsObj;
	
	beforeEach(function(){
		module(function($provide){
			var another = function(){
		        this.register = jasmine.createSpy('register');
		        this.$get=function(){};
		     };
		     $provide.provider('another', another);
		     $provide.constant('appConstants',{
		         ALLOW: 1,
		         DENY: 0
		     });
	  	});
	  	module("providers")
	  	module(function(anotherProvider, appConstants, sampleProvider){
	        anotherProviderObj=anotherProvider;
	        appConstantsObj=appConstants;
	        sampleProviderObj=sampleProvider;
	    });
	});
	beforeEach(inject());
	
	it('should call register with allow', function(){
		  sampleProviderObj.configureOptions({allow:true});
		  expect(anotherProviderObj.register).toHaveBeenCalled();
		  expect(anotherProviderObj.register).toHaveBeenCalledWith(appConstantsObj.ALLOW);
	});
	
	it('should call register with deny', function(){
		sampleProviderObj.configureOptions({allow:false});
	    expect(anotherProviderObj.register).toHaveBeenCalled();
	    expect(anotherProviderObj.register).toHaveBeenCalledWith(appConstantsObj.DENY);
	});
});