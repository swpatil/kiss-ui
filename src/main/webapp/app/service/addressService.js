(function() {

	angular
			.module('kissApp')
			.service(
					'AddressService',
					function($http, $q) {

						this.getInstallationsOnAddress = function(cusNo) {
							var d = $q.defer();
							$http
									.get(
											'/kiss-rest/installations/'+cusNo)
									.success(function(response) {
										d.resolve(response);
									}).error(function() {
										d.reject();
									});

							return d.promise;
						};
						this.addInstallationsOnAddress = function(cusNo) {
							var d = $q.defer();
							$http.get(
									'/kiss-rest/cableunit/cu/'
											+ cusNo).success(
									function(response) {
										d.resolve(response);
									}).error(function() {
								d.reject();
							});

							return d.promise;
						};

						this.searchAddress = function(postData) {
							var d = $q.defer();

							$http
									.post(
											"/kiss-rest/ams/addresses/search",
											postData).success(
											function(response) {
												d.resolve(response);
											}).error(function() {
										d.reject();
									});

							return d.promise;
						};
					});

})();