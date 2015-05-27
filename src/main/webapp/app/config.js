(function() {

	kissApp.config(['$stateProvider','$urlRouterProvider','$httpProvider',
					function($stateProvider, $urlRouterProvider,$httpProvider) {
			$httpProvider.interceptors.push('kissInterceptor');

						$urlRouterProvider.otherwise('/home');

						$stateProvider

								// HOME STATES AND NESTED VIEWS ========================================
								.state('home', {
									url : '/home',
									templateUrl : 'content/templates/home.html'
								})

								//Search States
								.state(
										'search',
										{
											url : '/search',
											templateUrl : 'content/templates/search.html'
										})

								.state(
										'search.customer',
										{
											url : '/customer',
											templateUrl : 'content/templates/customer-search.html',
											controller : 'customerSearchController'
										})

								.state(
										'search.address',
										{
											url : '/address',
											templateUrl : 'content/templates/popup-address.html',
											controller : 'modalAddressInstanceCtrl'
										})

								.state(
										'customer',
										{
											url : 'customer/:cusNo',

											views : {
												'' : {
													templateUrl : 'content/templates/customer-details.html'
												},

												'cusTree@customer' : {
													templateUrl : 'content/templates/customer-tree.html',
													controller : 'treeController'
												},
												'tabs@customer' : {
													templateUrl : 'content/templates/tabs.html',
													controller : 'cutabController'
												}
											}
										})

								.state(
										'customer.case',
										{
											url : '/case/:caseNo',

											views : {
												'' : {
													templateUrl : 'content/templates/customer-details.html'
												},

												
												'tabs@customer' : {
													templateUrl : 'content/templates/tabs.html',
													controller : 'casetabController'
												}
											}
										})
								.state(
										'address',
										{
											url : '/address/:cusNo',
											templateUrl : 'content/templates/popup-address.html',
											controller : 'modalAddressInstanceCtrl'
										});

					}]);
})();
