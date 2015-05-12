(function() {

var kissApp = angular.module('kissApp', [ 'ui.router','smart-table','angularTreeview','ui.bootstrap','cfp.hotkeys']);
kissApp.service('globalData',function(){
	return{
		dataLoaded : false
	};
});
kissApp.controller('progressIndicator',function($scope,globalData){
	$scope.isDataLoaded = globalData;
	 $scope.$watch('isDataLoaded.dataLoaded', function(newValue,oldValue,scope) {
	       console.log(scope+'oldValue'+oldValue+'newValue'+newValue+'scope'+scope);
	   });
});
})();