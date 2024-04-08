import api from "./api";

class RiderAPI {
  // Create Rider
  static create(values) {
    return api.post("/auth/rider/signup", values);
  }

  // Get all riders
  static getAll() {
    return api.get("/api/riders");
  }

  // Get Rider by id
  static getById(id) {
    return api.get(`/api/riders/${id}`);
  }

  // Update rider
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/riders/${id}`, data);
  }

  // Delete rider
  static delete(id) {
    return api.delete(`/api/riders/${id}`);
  }

  // Get rider count
  static getCount() {
    return api.get("/api/riders/get/count");
  }

  // Update  stock
  /*
  static updateStock(values) {
    const { data } = values;
    return api.patch("/api/suppliers/stock", data);
  }*/

  // Get available stock
  static getAvailableRiders() {
    return api.get("/api/riders/available");
  }
}

export default RiderAPI;
