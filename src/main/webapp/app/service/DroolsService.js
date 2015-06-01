kissApp.service('DroolsService', [ '$http', '$q',function($http, $q, globalData) {

	this.getBusinessRules = function() {
		var d = $q.defer();
		$http.get('/kiss-rest/drools/authorize').success(function(response) {
			d.resolve(response);
		}).error(function() {
			d.reject();
		});

		return d.promise;
	};
}]);
