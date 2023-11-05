import { Routes as Router, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import DashboardRoutes from "./DashboardRoutes";
import ConfirmationEmailPage from "../pages/ConfirmationEmailPage";

function Routes() {
  return (
    <Router>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/confirmation" element={<ConfirmationEmailPage />} />
    </Router>
  );
}

export default Routes;
