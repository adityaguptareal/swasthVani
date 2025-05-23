import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
    <div className="bg-background">

      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  );
}

export default Layout;
