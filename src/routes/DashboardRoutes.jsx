import { Routes as Router, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ClientsPage from "../pages/ClientsPage";

function DashboardRoutes() {
  return (
    <Router>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/clientes"
        element={
          <DashboardLayout>
            <ClientsPage />
          </DashboardLayout>
        }
      />
    </Router>
  );
}

export default DashboardRoutes;
