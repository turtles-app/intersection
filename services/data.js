app.factory("data", ['$rootScope', function($rootScope) {
	var self = this;
	var a = new Set("sets", "A");
	var b = new Set("sets", "B");
	var c = new Set("sets", "C");

	var colors = ['#970000','#E6943B','#CCC508','#C0009C','#EE2998','#27E493'];
	var x = new Element("x", a, colors[0]);
	var y = new Element("y", b, colors[1]);
	var z = new Element("z", a, colors[2]);

	this.sets = [a, b, c];
	this.elements = [x, y, z];
	this.intersectSet1 = null;
	this.intersectSet1 = null;
	this.updateScopes = function () {
		$rootScope.$broadcast("dataUpdate", 
			{
				sets: self.sets,
				elements: self.elements,
				intersectSet1: self.intersectSet1,
				intersectSet2: self.intersectSet2
			}
			);
	}
	return this;
}]);