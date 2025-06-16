import axios from "axios";

const API_URL = "http://localhost:8080/api/aquariums/";

class AquariumService {
  getAllAquariums() {
    return axios.get(API_URL, { headers: authService.getAuthHeader() });
  }

  getAquariumById(id) {
    return axios.get(API_URL + id, { headers: authService.getAuthHeader() });
  }

  createAquarium(name, volume) {
    return axios.post(
      API_URL,
      { name, volume },
      { headers: authService.getAuthHeader() }
    );
  }

  updateAquarium(id, name, volume) {
    return axios.put(
      API_URL + id,
      { name, volume },
      { headers: authService.getAuthHeader() }
    );
  }

  deleteAquarium(id) {
    return axios.delete(API_URL + id, { headers: authService.getAuthHeader() });
  }

  addDevice(aquariumId, type, name, status) {
    return axios.post(
      API_URL + aquariumId + "/devices",
      { type, name, status },
      { headers: authService.getAuthHeader() }
    );
  }

  addSensorReading(aquariumId, temperature, oxygen_level, ph_level) {
    return axios.post(
      API_URL + aquariumId + "/readings",
      { temperature, oxygen_level, ph_level },
      { headers: authService.getAuthHeader() }
    );
  }

  assignUser(aquariumId, userId) {
    return axios.post(
      API_URL + aquariumId + "/assign",
      { userId },
      { headers: authService.getAuthHeader() }
    );
  }
}

export default new AquariumService();
