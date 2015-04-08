(function() {

angular.module('kissApp').service('CustomerTreeService', function ($http, $q) {

    this.getCustomerTree = function (cusNo) {
        var d = $q.defer();
		console.log('cusNo' + cusNo);

        $http.get('/rest/installations/' + cusNo)
            .success(function (response) {
                d.resolve(response);
            })
            .error(function () {
                d.reject();
            });

        return d.promise;
    };
});


})();