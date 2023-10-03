import { Routes as Router, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ClientsPage from "../pages/ClientsPage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";

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
      <Route
        path="/produtos"
        element={
          <DashboardLayout>
            <ProductsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/servicos"
        element={
          <DashboardLayout>
            <ServicesPage />
          </DashboardLayout>
        }
      />
    </Router>
  );
}

export default DashboardRoutes;
