import React from "react";
import Navbar from "components/Navbar";

const Layout = ({ summary, children }) => {
  return (
    <div className="layout">
      <Navbar summary={summary} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
