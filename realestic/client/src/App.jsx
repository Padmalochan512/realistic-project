import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <ScrollToTop />
      <AllRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
