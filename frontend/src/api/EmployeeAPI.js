import api from "./api";

class EmployeeAPI {
  // Create Rider
  static create(values) {
    return api.post("/auth/employee/signup", values);
  }

  // Get all riders
  static getAll() {
    return api.get("/api/employees");
  }

  // Get Rider by id
  static getById(id) {
    return api.get(`/api/employees/${id}`);
  }

  // Update rider
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/employees/${id}`, data);
  }

  // Delete rider
  static delete(id) {
    return api.delete(`/api/employees/${id}`);
  }

  // Get rider count
  static getCount() {
    return api.get("/api/employees/get/count");
  }

  // Update  stock
  /*
  static updateStock(values) {
    const { data } = values;
    return api.patch("/api/suppliers/stock", data);
  }

  // Get available stock
  static getAvailableStock() {
    return api.get("/api/suppliers/stock");
  }*/
}

export default EmployeeAPI;
