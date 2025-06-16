import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import DeviceCard from "../components/DeviceCard";
import AquariumService from "../services/aquarium.service";
import DeviceService from "../services/device.service";
import AuthService from "../services/auth.service";

const Devices = () => {
  const [aquariums, setAquariums] = useState([]);
  const [error, setError] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    loadAquariums();
  }, []);

  const loadAquariums = () => {
    AquariumService.getAllAquariums()
      .then((response) => {
        setAquariums(response.data);
      })
      .catch((err) => {
        setError("Failed to load aquariums");
      });
  };

  const handleStatusChange = (deviceId, newStatus) => {
    DeviceService.updateDeviceStatus(deviceId, newStatus)
      .then(() => {
        loadAquariums();
      })
      .catch((err) => {
        setError("Failed to update device status");
      });
  };

  const handleDeleteDevice = (deviceId) => {
    DeviceService.deleteDevice(deviceId)
      .then(() => {
        loadAquariums();
      })
      .catch((err) => {
        setError("Failed to delete device");
      });
  };

  if (currentUser.role !== "ADMIN" && currentUser.role !== "MANAGER") {
    return (
      <Alert variant="danger">
        You don't have permission to access this page.
      </Alert>
    );
  }

  // Get all devices from all aquariums
  const allDevices = [];
  aquariums.forEach((aquarium) => {
    if (aquarium.devices && aquarium.devices.length > 0) {
      aquarium.devices.forEach((device) => {
        allDevices.push({
          ...device,
          aquariumName: aquarium.name,
        });
      });
    }
  });

  return (
    <div>
      <h2 className="mb-4">All Devices</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        {allDevices.length > 0 ? (
          allDevices.map((device) => (
            <div className="col-md-6" key={device.id}>
              <DeviceCard
                device={device}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteDevice}
              />
              <p className="text-muted">Aquarium: {device.aquariumName}</p>
            </div>
          ))
        ) : (
          <Alert variant="info">No devices found.</Alert>
        )}
      </div>
    </div>
  );
};

export default Devices;
