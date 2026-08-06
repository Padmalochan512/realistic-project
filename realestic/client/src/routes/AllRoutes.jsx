import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Contact from "../pages/public/Contact";
import AdminContact from "../pages/admin/AdminContact";
import AdminListing from "../pages/admin/AdminListing";
import Listing from "../pages/public/Listing";
import ListingDetails from "../pages/public/ListingDetails";
import AdminGallery from "../pages/admin/AdminGallery";
import Gallery from "../pages/public/Gallery";
import AdminAgent from "../pages/admin/AdminAgent";
import Agents from "../pages/public/Agents";
import AgentDetails from "../pages/public/AgentDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/agents/:id" element={<AgentDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminPrivateRoute />}>
        <Route path="admin/dashboard/" element={<AdminDashboard />} />
        <Route path="admin/contact" element={<AdminContact />} />
        <Route path="admin/listing" element={<AdminListing />} />
        <Route path="admin/gallery" element={<AdminGallery />} />
        <Route path="admin/agent" element={<AdminAgent />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
