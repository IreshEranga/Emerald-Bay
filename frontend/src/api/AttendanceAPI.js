import api from "./api";

class AttendanceAPI {
  // Create Employee
  static create(values) {
    return api.post("/auth/attendees", values);
  }

  // Get all employee
  static getAll() {
    return api.get("/api/attendees");
  }

  // Get emploee by id
  static getById(id) {
    return api.get(`/api/attendees/${id}`);
  }

  // Update employee
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/attendees/${id}`, data);
  }

  // Delete employee
  static delete(id) {
    return api.delete(`/api/attendees/${id}`);
  }

  // Get employee count
  static getCount() {
    return api.get("/api/attendees/get/count");
  }

}

export default AttendanceAPI;
