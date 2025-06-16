import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AquariumCard = ({ aquarium, canEdit, t }) => {
  const latestReading =
    aquarium.readings && aquarium.readings.length > 0
      ? aquarium.readings[0]
      : null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {aquarium.name}
          {canEdit && (
            <Button
              variant="outline-primary"
              size="sm"
              className="float-end"
              as={Link}
              to={`/aquariums/${aquarium.id}`}
            >
              {t("edit")}
            </Button>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {t("volume")}: {aquarium.volume} {t("liters")}
        </Card.Subtitle>

        {latestReading && (
          <>
            <div className="mb-2">
              <Badge
                bg={latestReading.temperature > 26 ? "danger" : "success"}
                className="me-2"
              >
                {t("temperature")}: {latestReading.temperature}°C
              </Badge>
              <Badge
                bg={latestReading.oxygen_level < 7 ? "danger" : "success"}
                className="me-2"
              >
                O₂: {latestReading.oxygen_level} {t("mgL")}
              </Badge>
              <Badge
                bg={
                  latestReading.ph_level < 6.5 || latestReading.ph_level > 8.5
                    ? "danger"
                    : "success"
                }
              >
                {t("ph")}: {latestReading.ph_level}
              </Badge>
            </div>
          </>
        )}

        <div className="mt-2">
          <Button
            variant="primary"
            size="sm"
            as={Link}
            to={`/aquariums/${aquarium.id}`}
          >
            {t("viewDetails")}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AquariumCard;
