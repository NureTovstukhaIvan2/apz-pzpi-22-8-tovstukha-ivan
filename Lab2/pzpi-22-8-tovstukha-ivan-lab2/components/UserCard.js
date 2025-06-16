import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const UserCard = ({ user, onDelete }) => {
  const getRoleVariant = () => {
    switch (user.role) {
      case "ADMIN":
        return "danger";
      case "MANAGER":
        return "warning";
      case "USER":
        return "success";
      default:
        return "light";
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {user.name}
          <Badge bg={getRoleVariant()} className="ms-2">
            {user.role}
          </Badge>
          <Button
            variant="outline-danger"
            size="sm"
            className="float-end"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Email: {user.email}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
