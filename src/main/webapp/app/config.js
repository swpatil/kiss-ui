
kissApp.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$httpProvider',
		'$translateProvider',
		'$logProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider,
				$translateProvider, $logProvider) {

			//For i18n and l10n.
			var env = 'dev';
			$logProvider.debugEnabled(env === 'dev');

			$translateProvider.useStaticFilesLoader({
				prefix : 'localeData/locale-',
				suffix : '.json'
			});

			// load 'dk' table on startup
			$translateProvider.preferredLanguage('dk');
			$translateProvider.fallbackLanguage('en');

			//register interceptors
			$httpProvider.interceptors.push('kissInterceptor');

			$urlRouterProvider.otherwise('/ntlmCheck');

			$stateProvider

			.state('ntlmCheck', {
				url : '/ntlmCheck',
				controller : 'loginController'

			}).state('login', {
				url : '/login',
				templateUrl : 'index.html',
				controller : 'loginController'

			}).state('home', {
				url : '/home',
				templateUrl : 'content/templates/home.html'
			})

			//Search States
			.state('search', {
				url : '/search',
				templateUrl : 'content/templates/search.html'
			})

			.state('search.customer', {
				url : '/customer',
				templateUrl : 'content/templates/customer-search.html',
				controller : 'customerSearchController'
			})

			.state('search.address', {
				url : '/address',
				templateUrl : 'content/templates/popup-address.html',
				controller : 'modalAddressInstanceCtrl'
			})

			.state('customer', {
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

			.state('customer.case', {
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
			}).state('address', {
				url : '/address/:cusNo',
				templateUrl : 'content/templates/popup-address.html',
				controller : 'modalAddressInstanceCtrl'
			});

		} ]);

kissApp.run(function($http, CacheFactory) {

	CacheFactory('defaultCache', {
		maxAge : 900000, // Items added to this cache expire after 15 minutes.
		cacheFlushInterval : 6000000, // This cache will clear itself every hour.
		deleteOnExpire : 'aggressive' // Items will be deleted from this cache right when they expire.
	});

	$http.defaults.cache = CacheFactory.get('defaultCache');
});
