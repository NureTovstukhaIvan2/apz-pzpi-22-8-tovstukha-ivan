import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const DeviceCard = ({ device, onStatusChange, onDelete }) => {
  const getStatusVariant = () => {
    switch (device.status) {
      case "ACTIVE":
        return "success";
      case "INACTIVE":
        return "secondary";
      case "MAINTENANCE":
        return "warning";
      default:
        return "light";
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(device.id, newStatus);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {device.name}
          <Badge bg={getStatusVariant()} className="ms-2">
            {device.status}
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Type: {device.type}
        </Card.Subtitle>

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
              handleStatusChange(
                device.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
              )
            }
          >
            {device.status === "ACTIVE" ? "Deactivate" : "Activate"}
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
              handleStatusChange(
                device.status === "MAINTENANCE" ? "ACTIVE" : "MAINTENANCE"
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
            onClick={() => onDelete(device.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DeviceCard;
