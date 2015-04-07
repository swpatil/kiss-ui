(function() {

kissApp.config(
					function($stateProvider, $urlRouterProvider) {

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
											templateUrl : 'content/templates/address-search.html',
											controller : 'addressSearchController'
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
													controller : 'tabController'
												}
											}
										})

					});
})();

