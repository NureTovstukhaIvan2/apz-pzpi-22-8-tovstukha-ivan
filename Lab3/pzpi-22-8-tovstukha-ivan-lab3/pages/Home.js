import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AquariumCard from "../components/AquariumCard";
import AquariumService from "../services/aquarium.service";
import AuthService from "../services/auth.service";

const Home = ({ t }) => {
  const [aquariums, setAquariums] = useState([]);
  const [error, setError] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      AquariumService.getAllAquariums()
        .then((response) => {
          setAquariums(response.data);
        })
        .catch((err) => {
          setError(t("failedToLoadAquariums"));
        });
    }
  }, [currentUser, t]);

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h2>{t("welcome")}</h2>
        <p>{t("pleaseLogin")}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">{t("yourAquariums")}</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        {aquariums.length > 0 ? (
          aquariums.map((aquarium) => (
            <div className="col-md-4" key={aquarium.id}>
              <AquariumCard
                aquarium={aquarium}
                canEdit={
                  currentUser.role === "ADMIN" || currentUser.role === "MANAGER"
                }
                t={t}
              />
            </div>
          ))
        ) : (
          <Alert variant="info">{t("noAquariums")}</Alert>
        )}
      </div>
    </div>
  );
};

export default Home;
