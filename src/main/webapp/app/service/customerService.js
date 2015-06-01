kissApp.service(
		'CustomerService',
		[
				'$http',
				'$log',
				'$q',
				'globalData',
				'CACHE_STATE',
				function($http, $log, $q, globalData, CACHE_STATE) {

					this.getInstallations = function(cusNo, page) {
						var d = $q.defer();
						$log.debug('cusNo' + cusNo);
						globalData.dataLoaded = true;
						$http.get(
								'/kiss-rest/installations/' + cusNo
										+ '/?pageNo=' + page, {
									cache : true
								}).success(function(response) {
							d.resolve(response);
							$log.debug("success" + response);
							globalData.dataLoaded = false;
						}).error(function() {
							d.reject();
						});

						return d.promise;
					};

					this.getCustomerTree = function(cusNo) {
						var d = $q.defer();
						$log.debug('cusNo service' + cusNo);

						$http.get('/kiss-rest/cableunit/cu/' + cusNo, {
							cache : CACHE_STATE
						}).success(function(response) {
							d.resolve(response);
						}).error(function() {
							d.reject();
						});

						return d.promise;
					};

					this.getCustomers = function(cuNum) {
						var d = $q.defer();

						$http.get('/kiss-rest/cableunit/cus/' + cuNum).success(
								function(response) {
									d.resolve(response);
								}).error(function() {
							d.reject();
						});

						return d.promise;
					};

					this.getCustomerNames = function(cuNum) {
						var d = $q.defer();

						$http.get('/kiss-rest/cableunit/search/cus/' + cuNum)
								.success(function(response) {
									d.resolve(response);
								}).error(function() {
									d.reject();
								});

						return d.promise;
					};

					this.getStreets = function(streetName) {
						var d = $q.defer();

						$http.get('/kiss-rest/ams/street/search/' + streetName)
								.success(function(response) {
									d.resolve(response);
								}).error(function() {
									d.reject();
								});

						return d.promise;
					};
				} ]);
