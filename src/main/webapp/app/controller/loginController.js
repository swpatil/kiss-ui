(function() {

	angular.module('kissApp').controller('loginController',
			[ '$scope','$rootScope', 'LoginService', '$state',
					function($scope, $rootScope, LoginService, $state) {

						LoginService.autoLogin().then(

						function(response) {
							console.log(response);
							if ($rootScope.authenticated) {
								$state.go("home");
							}else{
								$state.go("login");
							}
						});

						$scope.authenticate = function(){

                                  var username = $scope.username;
								  var password = $scope.password;

								  LoginService.authenticate(username,password).then(
									
										function(data) {
											console.log(data);
											if ($rootScope.authenticated) {
												$state.go("home");
											}else {
												$state.go("login");
											}
										});
						        };


					} ]);

})();