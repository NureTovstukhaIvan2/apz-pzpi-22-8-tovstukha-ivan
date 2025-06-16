import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../services/auth.service";

const CustomNavbar = ({ currentUser, t }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t("aquariumMonitoring")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {t("home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/aquariums">
              {t("aquariums")}
            </Nav.Link>
            {currentUser &&
              (currentUser.role === "ADMIN" ||
                currentUser.role === "MANAGER") && (
                <Nav.Link as={Link} to="/devices">
                  {t("devices")}
                </Nav.Link>
              )}
            {currentUser && currentUser.role === "ADMIN" && (
              <Nav.Link as={Link} to="/users">
                {t("users")}
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-light" id="dropdown-language">
                {t("language")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage("en")}>
                  {t("english")}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("ua")}>
                  {t("ukrainian")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {currentUser ? (
              <>
                <Navbar.Text className="me-2">
                  {t("signedInAs")}: {currentUser.name} (
                  {t(currentUser.role.toLowerCase())})
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  {t("logout")}
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                {t("login")}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
