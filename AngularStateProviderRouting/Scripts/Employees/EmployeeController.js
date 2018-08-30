app.controller("EmployeeController", function ($scope, EmployeeService, $log, $state, $stateParams, toastr, $window, $mdMedia) {


    $scope.Employees = {};
    $scope.currentPage = 0;
    $scope.pageSize = 10;

    
    GetAllEmployees();


    function GetAllEmployees() {
        $scope.loading = true;
        var servCall = EmployeeService.GetAllEmployees();
        servCall.then(function (d) {
            $scope.Employees = d.data;
            $scope.loading = false;
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the data.');
            $log.error(error);
            })
    }

    $scope.ViewEmp = function (id) {
       // $scope.EnableSubmit = false;
        $state.go('details.Edit', {'id':id});
       // GetEmployeeById(id);
    }

    $scope.DeleteEmp = function (id) {
     //   console.log($state)
        var Delemp = EmployeeService.DeleteEmployee(id);
        Delemp.then(function (d) {
            toastr.success('Data Deleted Successfully')
            GetAllEmployees();
        }, function (error) {
            console.log('Oops! Something went wrong while Deleting the data.');
            $log.error(error);
        })
    }

    $scope.numberOfPages = function () {
        if ($scope.Employees!=null&&$scope.Employees.length != 0) {
            return Math.ceil($scope.Employees.length / $scope.pageSize);
        }
    }

    $scope.Search = function () {
        Criteria = {
            Name: $scope.Search.Name,
            Title: $scope.Search.Title,
            Email: $scope.Search.Email
        };
        var Search = EmployeeService.Search(Criteria);
        $scope.loading = true;
        Search.then(function (d) {
            if (d != null && d.data.length!=0) {
                $scope.Employees = d.data;
                $scope.loading = false;
                toogleAccordion();
            }
            else {
                $scope.Employees = null;
                toastr.info('No Employees found with this search criteria');
                $scope.loading = false;
                $(Emptable).hide();
            }
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the data.');
            $log.error(error);
        })
    }

    $scope.Clear = function () {
        $scope.Search = { Name: "", Title: "", Email: "" };
        $(Emptable).show();
        toogleAccordion();
        GetAllEmployees();
    }

    function toogleAccordion() {
       // $(collapseOne).collapse('hide');
        $(collapseTwo).collapse('show');
    };

})


app.filter('startFrom', function () {
    return function (input, start) {
        if (!angular.isArray(input)) {
            return [];
        }
        start = +start; 
        return input.slice(start);
    };
});