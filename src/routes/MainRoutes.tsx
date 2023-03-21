import React from "react";
import { Navigate, Route, Routes } from "react-router";
import JetSkiPage from "../pages/jetSkiPage/JetSkiPage";
import NotFound from "../pages/notFound/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/jet-skis" element={<JetSkiPage />} />
      {/* ВАЖНО! Когда появится главная страница, изменить строку ниже */}
      <Route path="/" element={<Navigate to="/jet-skis" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
