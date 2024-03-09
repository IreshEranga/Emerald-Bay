import api from "./api";

class StockRequestAPI {
  // Create StockRequest
  static create(values) {
    return api.post("/api/stock-requests", values);
  }

  // Get all stockRequests
  static getAll() {
    return api.get("/api/stock-requests");
  }

  // Get StockRequest by id
  static getById(id) {
    return api.get(`/api/stock-requests/${id}`);
  }

  // Update StockRequest
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/stock-requests/${id}`, data);
  }

  // Delete StockRequest
  static delete(id) {
    return api.delete(`/api/stock-requests/${id}`);
  }

  // Get StockRequest count
  static getCount() {
    return api.get("/api/stock-requests/get/count");
  }

  // Get StockRequest for supplier
  static stockRequestForSupplier() {
    return api.get("/api/stock-requests/get/stockRequestForSupplier");
  }
}

export default StockRequestAPI;
