import api from "./api";

class InventoryAPI {
  // Create Inventory
  static create(values) {
    return api.post("/api/inventories", values);
  }

  // Get all Categories
  static getAll() {
    return api.get("/api/inventories");
  }

  // Get Inventory by id
  static getById(id) {
    return api.get(`/api/inventories/${id}`);
  }

  // Update Inventory
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/inventories/${id}`, data);
  }

  // Delete Inventory
  static delete(id) {
    return api.delete(`/api/inventories/${id}`);
  }

  // Get Inventory count
  static getCount() {
    return api.get("/api/inventories/get/count");
  }
}

export default InventoryAPI;
