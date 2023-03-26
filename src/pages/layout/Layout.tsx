import React from "react";
import MainRoutes from "../../routes/MainRoutes";
import Header from "../../components/header/Header";
import "./layout.scss";
import { BrowserRouter } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import OftenBuy from "../../components/oftenBuy/OftenBuy";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main_container">
        <MainRoutes />
        <OftenBuy />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
