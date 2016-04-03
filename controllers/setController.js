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