// Import the api instance
import api from "./api";

class leavesAPI {
  // Create Leave
  static create(values) {
    return api.post("/api/leaves", values);
  }

  // Get all leaves
  static getAll() {
    return api.get("/api/leaves");
  }

  // Get leave by id
  static getById(id) {
    // Check if id is provided and not undefined or null
    if (id) {
      return api.get(`/api/leaves/${id}`);
    } else {
      // Handle the case where id is not provided
      // Return an empty object or null
      return null;
    }
  }

  // Update leave
   static update(values) {
     const { id, data } = values;
     return api.patch(`/api/leaves/${id}`, data);
   }

  // Delete leave
  static delete(id) {
    return api.delete(`/api/leaves/${id}`);
  }

  // Approve leave
  static approve(id) {
    return api.patch(`/api/leaves/${id}/approve`);
  }

  // Reject leave
  static reject(id) {
    return api.patch(`/api/leaves/${id}/reject`);
  }
}

export default leavesAPI;
