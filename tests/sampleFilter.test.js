describe('filter sample', function () {

  // load the controller's module
  beforeEach(module('filters'));

  var num;
  beforeEach(inject(function($filter){
	    num = $filter('num');
  }));

  it('returns the correct int value when given a string of chars', function() {
    expect(num('1234')).toEqual(1234);
  });
});
