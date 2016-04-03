var app = angular.module("app", []);

var dragData = {
	type: '',
	index: null,
}

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

app.controller("intersectionController", ["$scope", "$rootScope", "data", function($scope, $rootScope, data) {
	this.set1 = data.intersectSet1;
	this.set2 = data.intersectSet2;
	this.opacity = 1;
	this.setColors = ["green", "orange", "blue"];
	this.groupNames = ["sets", "intersection", "union"];

	this.dropAllowed = function () {
		if (dragData.type === 'set' && dragData.index >= 0) return true;
	}
	this.dropSet1 = function () {
		if ($scope.intersect.set1) data.sets.push($scope.intersect.set1);
		data.intersectSet1 = data.sets.splice(parseInt(dragData.index), 1)[0];
		$scope.intersect.set1 = data.intersectSet1;
		$scope.$apply();
	}
	this.dropSet2 = function () {
		if ($scope.intersect.set2) data.sets.push($scope.intersect.set2);
		data.intersectSet2 = data.sets.splice(parseInt(dragData.index), 1)[0];
		$scope.intersect.set2 = data.intersectSet2;
		$scope.intersect.opacity = .5;
		$scope.$apply();
	}

	$rootScope.$on("dataUpdate", function(ev, data) {
		$scope.intersect.set1 = data.intersectSet1;
		$scope.intersect.set2 = data.intersectSet2;
	});

	$rootScope.$on("newSet", function(ev, data) {
		$scope.intersect.opacity = 1;
	});
}]);

app.controller("setController", ["$scope", "$rootScope", "data", function($scope, $rootScope, data) {
	this.sets = data.sets;
	this.setColors = ["green", "orange", "blue"];
	this.groupNames = ["sets", "intersection", "union"];
	
	this.dropAllowed = function () {
		if (dragData.type === 'intersection' && dragData.index >= 0) {return true} else {return false;}
	}

	this.drop = function () {
		switch (dragData.type) {
			case 'intersection':
				var res = intersection("name", data.intersectSet1, data.intersectSet2);
				$scope.setCtrl.sets.push(data.intersectSet1, data.intersectSet2);
				data.intersectSet1 = null;
				data.intersectSet2 = null;
				$scope.setCtrl.set1 = null;
				$scope.setCtrl.set2 = null;
				res.groupIndex = $scope.setCtrl.sets.length;
				$scope.setCtrl.sets.push(res);
				data.updateScopes();
				break;
		}
		$rootScope.$broadcast("newSet", {

		});
		$scope.$apply();
	}

}]);
