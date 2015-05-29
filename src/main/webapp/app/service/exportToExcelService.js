(function() {

angular.module('kissApp').service('ExportToExcelService', function ($http, $q,globalData) {

    this.exportToElsInstallations = function (cusNo,page) {
      //  var d = $q.defer();
        $http.get('/kiss-rest/exportToExcel/installations');
    };
});


})();