kissApp.directive('myTabs', function() {
	return {
		restrict : 'AE',
		scope : false,
		templateUrl : 'content/templates/myTabs.html',
		link : function(scope, element, attrs) {
			scope.tabs = scope.$eval(attrs.tabs);

			scope.setActiveTab = function(title) {
				for (var i = 0; i < scope.tabs.length; i++) {
					scope.tabs[i].show = false; // hide all the other tabs 

					if (scope.tabs[i].title === title) {
						scope.tabs[i].show = true; // show the new tab 
					}
				}
			};
		}
	};
});

kissApp.directive('staticInclude', [ '$http', '$templateCache', '$compile',
		function($http, $templateCache, $compile) {
			return function(scope, element, attrs) {
				var templatePath = attrs.staticInclude;
				$http.get(templatePath, {
					cache : $templateCache
				}).success(function(response) {
					var contents = element.html(response).contents();
					$compile(contents)(scope);
				});
			};
		} ]);

kissApp.directive('csSelect', function() {
	return {
		require : '^stTable',
		template : '',
		scope : {
			row : '=csSelect'
		},
		link : function(scope, element, attr, ctrl) {

			element.bind('change', function(evt) {
				scope.$apply(function() {
					ctrl.select(scope.row, 'multiple');
				});
			});

			scope.$watch('row.isSelected', function(newValue, oldValue) {
				if (newValue === true) {
					element.parent().addClass('st-selected');
					scope.$parent.addressId.push(scope.row.id.addressId);
					//console.log('after sekection'+scope.$parent.addressId);
				} else {
					element.parent().removeClass('st-selected');
					var index = scope.$parent.addressId
							.indexOf(scope.row.id.addressId);
					if (index > -1) {
						scope.$parent.addressId.splice(index, 1);
					}
					// console.log('after removal'+scope.$parent.addressId);
				}
			});
		}
	};
});
kissApp.directive('stRatio', function() {
	return {
		link : function(scope, element, attr) {
			var ratio = +(attr.stRatio);

			element.css('width', ratio + '%');

		}
	};
});
kissApp
		.directive(
				'pageSelect',
				function() {
					return {
						restrict : 'E',
						template : '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
						link : function(scope, element, attrs) {
							scope.$watch('currentPage', function(c) {
								scope.inputPage = c;
							});
						}
					};
				});

kissApp.directive("droolsCheck", [
		'$scope',
		'element',
		'attributes',
		function() {
			function link($scope, element, attributes) {

				// 
				var droolsArray = attributes.droolsCheck;

				// I am the optional slide duration.
				var droolsConstraintId = attributes.droolsConstraint;
				$scope.$watch(droolsArray, function(droolsNewValue,
						droolsOldValue) {
					if (droolsNewValue != droolsOldValue) {
						if (droolsNewValue.enableFields
								.indexOf(droolsConstraintId) > -1) {
							element.prop("disabled", false);

						}
					}
				});

			}

			// Return the directive configuration.
			return ({
				link : link,
				restrict : "A"
			});

		} ]);

kissApp.directive('dateTimePicker', [ '$rootScope', function($rootScope) {

	return {
		require : '?ngModel',
		restrict : 'AE',
		scope : {
			pick12HourFormat : '@',
			language : '@',
			useCurrent : '@',
			location : '@'
		},
		link : function(scope, elem, attrs) {
			elem.datetimepicker({
				pick12HourFormat : scope.pick12HourFormat,
				language : scope.language,
				useCurrent : scope.useCurrent
			});

			//Local event change
			elem.on('blur', function() {

				console.info('this', this);
				console.info('scope', scope);
				console.info('attrs', attrs);

				/*// returns moments.js format object
				scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
				// Global change propagation

				$rootScope.$broadcast("emit:dateTimePicker", {
				    location: scope.location,
				    action: 'changed',
				    dateTime: scope.dateTime,
				    example: scope.useCurrent
				});
				scope.$apply();*/
			});
		}
	};
} ]);
kissApp.directive('fixedTableHeaders', [ '$timeout', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			$timeout(function() {
				container = element.parentsUntil(attrs.fixedTableHeaders);
				element.stickyTableHeaders({
					scrollableArea : container,
					"fixedOffset" : 2
				});
			}, 0);
		}
	};
} ]);