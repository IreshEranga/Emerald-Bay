import api from "./api";

class CategoryAPI {
  // Create Category
  static create(values) {
    return api.post("/api/categories", values);
  }

  // Get all Categories
  static getAll() {
    return api.get("/api/categories");
  }

  // Get Category by id
  static getById(id) {
    return api.get(`/api/categories/${id}`);
  }

  // Update Category
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/categories/${id}`, data);
  }

  // Delete Category
  static delete(id) {
    return api.delete(`/api/categories/${id}`);
  }

  // Get Category count
  static getCount() {
    return api.get("/api/categories/get/count");
  }
}

export default CategoryAPI;
