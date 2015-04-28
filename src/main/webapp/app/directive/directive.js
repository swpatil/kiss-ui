angular.module('kissApp').directive('myTabs', [ function() {
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
} ])

.directive('staticInclude', function($http, $templateCache, $compile) {
	return function(scope, element, attrs) {
		var templatePath = attrs.staticInclude;
		$http.get(templatePath, {
			cache : $templateCache
		}).success(function(response) {
			var contents = element.html(response).contents();
			$compile(contents)(scope);
		});
	};
});

angular.module('kissApp').directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                    scope.$parent.addressId.push(scope.row.id.addressId);
                    //console.log('after sekection'+scope.$parent.addressId);
                } else {
                    element.parent().removeClass('st-selected');
                    var index = scope.$parent.addressId.indexOf(scope.row.id.addressId);
                    if (index > -1) {
                    	scope.$parent.addressId.splice(index, 1);
                    }
                   // console.log('after removal'+scope.$parent.addressId);
                }
            });
        }
    };
});
angular.module('kissApp').directive('stRatio',function(){
    return {
      link:function(scope, element, attr){
        var ratio=+(attr.stRatio);
        
        element.css('width',ratio+'%');
        
      }
    };
});
angular.module('kissApp').directive('pageSelect', function() {
  return {
    restrict: 'E',
    template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
    link: function(scope, element, attrs) {
      scope.$watch('currentPage', function(c) {
        scope.inputPage = c;
      });
    }
  }
});