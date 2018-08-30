app.service("EmployeeService", function ($http) {

    this.GetAllEmployees = function () {
        return $http.get("/api/employees");
    }
    this.AddEmployee = function (emp) {
        return $http.post("/api/employees",emp);
    }
    this.GetEmpById = function (id) {
        return $http.get("/api/employees?id="+ id);
    }
    this.EditEmployee = function (emp) {
        return $http.put("/api/employees?id="+emp.Id,emp);
    }
    this.DeleteEmployee = function (id) {
        return $http.delete("/api/employees?id=" + id);
    }
    this.Search = function (Criteria) {
        return $http.post("/api/employees/Search/", Criteria);
    }
})

