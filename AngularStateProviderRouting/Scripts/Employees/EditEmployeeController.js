app.controller("EditEmployeeController", function ($scope, EmployeeService, $state, $stateParams, toastr, $log) {

   
    $scope.empTitle = false;
    $scope.empName = false;
    $scope.empEmail = false;
    $scope.empEmailExp = false;
    $scope.EnableSubmit = false;
    $scope.Emp = { Name: "", Title: "", Email: "" };
    GetEmployeeById();

    function GetEmployeeById() {
        var id = $stateParams.id;
        $scope.IsEdit = $stateParams.IsEdit;
        if (id != null) {
            var servCall = EmployeeService.GetEmpById(id);
            servCall.then(function (d) {
                $scope.Emp = d.data;
            }, function (error) {
                $log.error('Oops! Something went wrong while fetching the data.');
                $log.error(error);
            })
        }
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    function ValidateInput() {
        var error = false;
        $scope.empTitle = false;
        $scope.empName = false;
        $scope.empEmail = false;
        $scope.empEmailExp = false;
        if ($scope.Emp.Name == "") {
            $scope.empName = true;
            error= true;
        }
        if ($scope.Emp.Title == "") {
            $scope.empTitle = true;
            error = true;
        }
        if ($scope.Emp.Email == "") {
            $scope.empEmail = true;
            error =true;
        }
        else if (!ValidateEmail($scope.Emp.Email)) {
            $scope.empEmailExp = true;
            error = true;
        }
        return error;
    }

    $scope.Back = function () {
        $state.go('Listing');
        $scope.Emp = { Name: "", Title: "", Email: "" };
    }

    $scope.AddEmp = function () {
        if (ValidateInput()) {
            return;
        }
        var addemp = EmployeeService.AddEmployee($scope.Emp);
        addemp.then(function (d) {
            toastr.success('Data Saved Successfully')
            $state.go("Listing");
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.');
            $log.error(error);
        })
    }

    $scope.EditEmp = function () {
        if (ValidateInput()) {
            return;
        }
        var editemp = EmployeeService.EditEmployee($scope.Emp);
        editemp.then(function (d) {
            toastr.success('Data Saved Successfully')
            $state.go("Listing");
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.');
            $log.error(error);
        })
    }


    $scope.$watch('Emp', function (newValue, oldValue) {
        if (newValue != oldValue && oldValue.Name != "" && oldValue.Email != "" && oldValue.Title != "") {
            $scope.EnableSubmit = true;
        }
    }, true);

  
   
})


