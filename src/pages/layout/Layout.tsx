import React from "react";
import MainRoutes from "../../routes/MainRoutes";
import Header from "../../components/header/Header";
import "./layout.scss";
import { BrowserRouter } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main_container">
        <MainRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
