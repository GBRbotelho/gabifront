// App.js
import { Routes as Router, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/DashboardPage";

function Routes() {
  return (
    <div>
      <Router>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Router>
    </div>
  );
}

export default Routes;
