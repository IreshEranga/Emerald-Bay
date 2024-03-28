import api from "./api";

class VIPRoomAPI {
  // Create reservation
  static create(values) {
    return api.post("/auth/room/add", values);
  }

  // Get all reservation
  static getAll() {
    return api.get("/api/rooms");
  }

  // Get reservation by id
  static getById(id) {
    return api.get(`/api/rooms/${id}`);
  }

  // Update reservation
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/rooms/${id}`, data);
  }

  // Delete reservation
  static delete(id) {
    return api.delete(`/api/rooms/${id}`);
  }

  // Get reservation count
  static getCount() {
    return api.get("/api/rooms/get/count");
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

export default VIPRoomAPI;
