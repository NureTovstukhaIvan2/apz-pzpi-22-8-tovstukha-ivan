import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === "ADMIN";
  }

  isManager() {
    const user = this.getCurrentUser();
    return user && user.role === "MANAGER";
  }

  isUser() {
    const user = this.getCurrentUser();
    return user && user.role === "USER";
  }
}

export default new AuthService();
