import React from "react";
import Navbar from "components/Navbar";

const Layout = ({ navtext, children }) => {
  return (
    <div className="layout">
      <Navbar navtext={navtext} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
