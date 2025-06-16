import axios from "axios";

const API_URL = "http://localhost:8080/api/devices/";

class DeviceService {
  updateDeviceStatus(id, status) {
    return axios.put(
      API_URL + id + "/status",
      { status },
      { headers: authService.getAuthHeader() }
    );
  }

  deleteDevice(id) {
    return axios.delete(API_URL + id, { headers: authService.getAuthHeader() });
  }
}

export default new DeviceService();
