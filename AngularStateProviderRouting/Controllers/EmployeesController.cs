using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularStateProviderRouting;
using AngularStateProviderRouting.Models;

namespace AngularStateProviderRouting.Controllers
{
    public class EmployeesController : ApiController
    {
        private EmployeesDBEntities db = new EmployeesDBEntities();

        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            return db.Employees;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Employees.Add(employee);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        [HttpPost]
        [Route("api/Employees/Search")]
        public IEnumerable<Employee> Search(SearchCriteria Criteria)
        {
            if (Criteria != null)
            {
                var Employees = db.Employees.Where((x => 
                    (Criteria.Name!=null? x.Name.Contains(Criteria.Name): x.Name.Contains("")) &&
                    (Criteria.Title != null ? x.Title.Contains(Criteria.Title) : x.Title.Contains("")) &&
                    (Criteria.Email != null ? x.Email.Contains(Criteria.Email) : x.Email.Contains(""))
                    )).ToList();
                    //from emp in db.Employees
                              //  where /*Criteria.Name != null ?*/ emp.Name.Contains(Criteria.Name) ;/*: emp.Name == null)*/ // && () && ()
                                //select new Employee()
                                //{
                                //    Id = emp.Id,
                                //    Name = emp.Name,
                                //    Email = emp.Email,
                                //    Title = emp.Title
                                //};
                return Employees;
            }
            else
                return null;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.Id == id) > 0;
        }
    }
}