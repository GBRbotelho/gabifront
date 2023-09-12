import { Routes as Router, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import DashboardLayout from "../components/layout/DashboardLayout";

function DashboardRoutes() {
  return (
    <Router>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
    </Router>
  );
}

export default DashboardRoutes;
