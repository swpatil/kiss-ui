kissApp.service('LoginService',['$http','$q','$rootScope', function($http, $q,$rootScope) {

	this.autoLogin = function() {
		var d = $q.defer();

		$http.get('/kiss-rest/ntlmCheckLogin')

		.success(function(data, status, headers, config) {

			d.resolve(response);
		}).error(function(data, status, headers, config) {

			if (status == 404 && headers()['x-k2ui-userid'] != null) {
				 $rootScope.authenticated = true;
			} else {
				 $rootScope.authenticated = false;
				d.reject();
			}

		});

		return d.promise;
	};

	this.authenticate = function(username, password) {
		var d = $q.defer();

		$http.post('/kiss-rest/authenticate/login', {
			"username" : username,
			"password" : password
		})

		.success(function(data, status, headers, config) {
			$rootScope.authenticated = true;
			d.resolve(data);
		}).error(function(data, status, headers, config) {
			$rootScope.authenticated = false;
			d.reject();

		});

		return d.promise;
	};

}]);
