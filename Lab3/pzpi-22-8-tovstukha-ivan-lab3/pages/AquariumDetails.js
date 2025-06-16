import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Alert,
  Card,
  Badge,
  Form,
  Row,
  Col,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AquariumService from "../services/aquarium.service";
import AuthService from "../services/auth.service";
import DeviceService from "../services/device.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AquariumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aquarium, setAquarium] = useState(null);
  const [error, setError] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [ph, setPh] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("THERMOSTAT");
  const [activeTab, setActiveTab] = useState("parameters");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    loadAquarium();
  }, [id]);

  const loadAquarium = () => {
    AquariumService.getAquariumById(id)
      .then((response) => {
        setAquarium(response.data);
      })
      .catch((err) => {
        setError("Failed to load aquarium details");
      });
  };

  const handleAddReading = () => {
    setError("");

    AquariumService.addSensorReading(id, temperature, oxygen, ph)
      .then(() => {
        setTemperature("");
        setOxygen("");
        setPh("");
        loadAquarium();
      })
      .catch((err) => {
        setError("Failed to add sensor reading");
      });
  };

  const handleAddDevice = () => {
    setError("");

    AquariumService.addDevice(id, deviceType, deviceName, "ACTIVE")
      .then(() => {
        setDeviceName("");
        setDeviceType("THERMOSTAT");
        loadAquarium();
      })
      .catch((err) => {
        setError("Failed to add device");
      });
  };

  const handleDeviceStatusChange = (deviceId, newStatus) => {
    DeviceService.updateDeviceStatus(deviceId, newStatus)
      .then(() => {
        loadAquarium();
      })
      .catch((err) => {
        setError("Failed to update device status");
      });
  };

  const handleDeleteDevice = (deviceId) => {
    DeviceService.deleteDevice(deviceId)
      .then(() => {
        loadAquarium();
      })
      .catch((err) => {
        setError("Failed to delete device");
      });
  };

  if (!aquarium) {
    return <div>Loading...</div>;
  }

  const latestReading =
    aquarium.readings && aquarium.readings.length > 0
      ? aquarium.readings[0]
      : null;

  // Prepare data for charts
  const readingsData = aquarium.readings || [];
  const labels = readingsData
    .map((_, index) => `Reading ${index + 1}`)
    .reverse();

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: readingsData.map((r) => r.temperature).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const oxygenData = {
    labels,
    datasets: [
      {
        label: "Oxygen (mg/l)",
        data: readingsData.map((r) => r.oxygen_level).reverse(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const phData = {
    labels,
    datasets: [
      {
        label: "pH Level",
        data: readingsData.map((r) => r.ph_level).reverse(),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        Back
      </Button>

      <h2 className="mb-4">{aquarium.name}</h2>
      <p className="text-muted">Volume: {aquarium.volume} liters</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="parameters" title="Parameters">
          <div className="mt-4">
            {latestReading && (
              <Row className="mb-4">
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Temperature</Card.Title>
                      <Card.Text>
                        <Badge
                          bg={
                            latestReading.temperature > 26
                              ? "danger"
                              : "success"
                          }
                        >
                          {latestReading.temperature}°C
                        </Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Oxygen Level</Card.Title>
                      <Card.Text>
                        <Badge
                          bg={
                            latestReading.oxygen_level < 7
                              ? "danger"
                              : "success"
                          }
                        >
                          {latestReading.oxygen_level} mg/l
                        </Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>pH Level</Card.Title>
                      <Card.Text>
                        <Badge
                          bg={
                            latestReading.ph_level < 6.5 ||
                            latestReading.ph_level > 8.5
                              ? "danger"
                              : "success"
                          }
                        >
                          {latestReading.ph_level}
                        </Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            <h4 className="mt-4">Charts</h4>
            <Row className="mb-4">
              <Col md={12} className="mb-4">
                <Line data={temperatureData} />
              </Col>
              <Col md={12} className="mb-4">
                <Line data={oxygenData} />
              </Col>
              <Col md={12}>
                <Line data={phData} />
              </Col>
            </Row>

            {(currentUser.role === "ADMIN" ||
              currentUser.role === "MANAGER") && (
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>Add New Sensor Reading</Card.Title>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Temperature (°C)</Form.Label>
                          <Form.Control
                            type="number"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Oxygen (mg/l)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            value={oxygen}
                            onChange={(e) => setOxygen(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>pH Level</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.1"
                            value={ph}
                            onChange={(e) => setPh(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" onClick={handleAddReading}>
                      Add Reading
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </Tab>

        <Tab eventKey="devices" title="Devices">
          <div className="mt-4">
            <h4>Devices</h4>

            {aquarium.devices && aquarium.devices.length > 0 ? (
              <Row>
                {aquarium.devices.map((device) => (
                  <Col md={6} key={device.id}>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>
                          {device.name}
                          <Badge
                            bg={
                              device.status === "ACTIVE"
                                ? "success"
                                : device.status === "INACTIVE"
                                ? "secondary"
                                : "warning"
                            }
                            className="ms-2"
                          >
                            {device.status}
                          </Badge>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Type: {device.type}
                        </Card.Subtitle>

                        {(currentUser.role === "ADMIN" ||
                          currentUser.role === "MANAGER") && (
                          <div className="mt-2">
                            <Button
                              variant={
                                device.status === "ACTIVE"
                                  ? "outline-secondary"
                                  : "outline-success"
                              }
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                handleDeviceStatusChange(
                                  device.id,
                                  device.status === "ACTIVE"
                                    ? "INACTIVE"
                                    : "ACTIVE"
                                )
                              }
                            >
                              {device.status === "ACTIVE"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>

                            <Button
                              variant={
                                device.status === "MAINTENANCE"
                                  ? "outline-secondary"
                                  : "outline-warning"
                              }
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                handleDeviceStatusChange(
                                  device.id,
                                  device.status === "MAINTENANCE"
                                    ? "ACTIVE"
                                    : "MAINTENANCE"
                                )
                              }
                            >
                              {device.status === "MAINTENANCE"
                                ? "End Maintenance"
                                : "Maintenance"}
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteDevice(device.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="info">No devices found for this aquarium.</Alert>
            )}

            {(currentUser.role === "ADMIN" ||
              currentUser.role === "MANAGER") && (
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>Add New Device</Card.Title>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Device Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Device Type</Form.Label>
                          <Form.Select
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                          >
                            <option value="THERMOSTAT">Thermostat</option>
                            <option value="AERATOR">Aerator</option>
                            <option value="PH_CONTROLLER">pH Controller</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" onClick={handleAddDevice}>
                      Add Device
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AquariumDetails;
