import React from "react";
import Navbar from "components/Navbar";
import { Container } from "@material-ui/core";

const Layout = ({ children, setThemeName, currentTheme }) => {
  return (
    <>
      <Navbar setThemeName={setThemeName} currentTheme={currentTheme} />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
