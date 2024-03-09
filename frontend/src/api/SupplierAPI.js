import api from "./api";

class SupplierAPI {
  // Create Supplier
  static create(values) {
    return api.post("/auth/supplier/signup", values);
  }

  // Get all Suppliers
  static getAll() {
    return api.get("/api/suppliers");
  }

  // Get Supplier by id
  static getById(id) {
    return api.get(`/api/suppliers/${id}`);
  }

  // Update Supplier
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/suppliers/${id}`, data);
  }

  // Delete Supplier
  static delete(id) {
    return api.delete(`/api/suppliers/${id}`);
  }

  // Get Supplier count
  static getCount() {
    return api.get("/api/suppliers/get/count");
  }

  // Update Supplier stock
  static updateStock(values) {
    const { data } = values;
    return api.patch("/api/suppliers/stock", data);
  }

  // Get available stock
  static getAvailableStock() {
    return api.get("/api/suppliers/stock");
  }
}

export default SupplierAPI;
