
var app = angular.module('EmployeesModule', ['ui.router', 'toastr', 'ngMaterial', 'ngMessages']);

app.config(function ($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('/Listing');

    $stateProvider
        .state('Listing', {
            url: '/Listing',
            templateUrl: 'Views/ListingEmployees.html',
            controller: 'EmployeeController',

        })

        .state('details', {
              abstract: true,
            url: '/details',
            template: '<ui-view/>'

        })


        .state('details.Add', {
            url: '/Add',
            parent: 'details',
            templateUrl: 'Views/EmployeeDetails.html',
            controller: 'EditEmployeeController',
            params: { 'IsEdit': false }
        })

        .state('details.Edit', {
            url: '/Edit/:id',
            parent: 'details',
            templateUrl: 'Views/EmployeeDetails.html',
            controller: 'EditEmployeeController',
            params: { 'id': null,'IsEdit':true}
        })
    

});



