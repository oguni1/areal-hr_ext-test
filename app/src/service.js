import http from "./http-common";

class service {
  getAll() {
    return http.get("/organizations");
  }

  get(id) {
    return http.get(`/organizations/${id}`);
  }

  create(data) {
    return http.post("/organizations", data);
  }

  update(id, data) {
    return http.put(`/organizations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/organizations/${id}`);
  }

  deleteAll() {
    return http.delete(`/organizations`);
  }

  findByName(name) {
    return http.get(`/organizations?name=${name}`);
  }
}

export default new service();
