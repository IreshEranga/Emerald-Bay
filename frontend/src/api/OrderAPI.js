import api from "./api";

class OrderAPI {
  // Create order request
  static create(values) {
    return api.post("/api/create", values);
  }

  // Get all stockRequests
  static getAll() {
    return api.get("/api/orders");
  }

  // Get StockRequest by id
  static getById(id) {
    return api.get(`/api/orders/${id}`);
  }

  // Update StockRequest
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/orders/${id}`, data);
  }

  // Delete StockRequest
  static delete(id) {
    return api.delete(`/api/orders/${id}`);
  }

  // Get StockRequest count
  static getCount() {
    return api.get("/api/orders/get/count");
  }

  // Get StockRequest for supplier
  static deliverRequestForRider() {
    return api.get("/api/orders/get/deliverRequestForRider");
  }
}

export default OrderAPI;
