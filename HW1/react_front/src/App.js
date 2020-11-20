import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomDashboard from "./dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <CustomDashboard />
    </BrowserRouter>
  );
}
