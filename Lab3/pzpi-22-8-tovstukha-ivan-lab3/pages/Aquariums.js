import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import AquariumCard from "../components/AquariumCard";
import AquariumService from "../services/aquarium.service";
import AuthService from "../services/auth.service";

const Aquariums = () => {
  const [aquariums, setAquariums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [volume, setVolume] = useState("");
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

  const handleCreateAquarium = () => {
    setError("");

    AquariumService.createAquarium(name, volume)
      .then(() => {
        setShowModal(false);
        setName("");
        setVolume("");
        loadAquariums();
      })
      .catch((err) => {
        setError("Failed to create aquarium");
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Aquariums</h2>
        {(currentUser.role === "ADMIN" || currentUser.role === "MANAGER") && (
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Aquarium
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        {aquariums.map((aquarium) => (
          <div className="col-md-4" key={aquarium.id}>
            <AquariumCard
              aquarium={aquarium}
              canEdit={
                currentUser.role === "ADMIN" || currentUser.role === "MANAGER"
              }
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Aquarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Volume (liters)</Form.Label>
              <Form.Control
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateAquarium}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Aquariums;
