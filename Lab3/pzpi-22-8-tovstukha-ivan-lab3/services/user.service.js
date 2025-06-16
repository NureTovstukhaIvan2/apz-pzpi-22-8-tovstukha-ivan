import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authService.getAuthHeader() });
  }

  getUserById(id) {
    return axios.get(API_URL + id, { headers: authService.getAuthHeader() });
  }

  createUser(email, password, name, role) {
    return axios.post(
      API_URL,
      { email, password, name, role },
      { headers: authService.getAuthHeader() }
    );
  }

  updateUser(id, email, name, role) {
    return axios.put(
      API_URL + id,
      { email, name, role },
      { headers: authService.getAuthHeader() }
    );
  }

  deleteUser(id) {
    return axios.delete(API_URL + id, { headers: authService.getAuthHeader() });
  }

  getUserAquariums(userId) {
    return axios.get(API_URL + userId + "/aquariums", {
      headers: authService.getAuthHeader(),
    });
  }
}

export default new UserService();
