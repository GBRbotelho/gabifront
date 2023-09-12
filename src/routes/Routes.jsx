import { Routes as Router, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import DashboardRoutes from "./DashboardRoutes";

function Routes() {
  return (
    <Router>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Router>
  );
}

export default Routes;
