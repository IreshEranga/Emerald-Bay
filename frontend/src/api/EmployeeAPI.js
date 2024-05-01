import api from "./api";

class EmployeeAPI {
  // Create Employee
  static create(values) {
    return api.post("/auth/employee/signup", values);
  }

  // Get all employee
  static getAll() {
    return api.get("/api/employees");
  }

  // Get emploee by id
  static getById(id) {
    return api.get(`/api/employees/${id}`);
  }

  // Update employee
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/employees/${id}`, data);
  }

  // Delete employee
  static delete(id) {
    return api.delete(`/api/employees/${id}`);
  }

  // Get employee count
  static getCount() {
    return api.get("/api/employees/get/count");
  }

 
}

export default EmployeeAPI;
