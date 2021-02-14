import React from "react";
import Navbar from "components/Navbar";
import { Container } from "@material-ui/core";

const Layout = ({ children, setThemeName, currentTheme }) => {
  return (
    <>
      <Navbar setThemeName={setThemeName} currentTheme={currentTheme} />
      <Container style={{ marginTop: "2em" }}>{children}</Container>
    </>
  );
};

export default Layout;
