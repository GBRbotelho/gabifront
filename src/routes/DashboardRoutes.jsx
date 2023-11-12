import { Routes as Router, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ClientsPage from "../pages/ClientsPage";
import ClientsAddPage from "../pages/ClientsAddPage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";
import TreatmentsPage from "../pages/TreatmentsPage";
import UsersPage from "../pages/UsersPage";
import UsersAddPage from "../pages/UsersAddPage";
import ClientViewerPage from "../pages/ClientViewerPage";

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

      {/* Rotas de Clientes */}
      <Route
        path="/clientes"
        element={
          <DashboardLayout>
            <ClientsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/clientes/add"
        element={
          <DashboardLayout>
            <ClientsAddPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/clientes/view/:id"
        element={
          <DashboardLayout>
            <ClientViewerPage />
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
        path="/usuarios"
        element={
          <DashboardLayout>
            <UsersPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/usuarios/add"
        element={
          <DashboardLayout>
            <UsersAddPage />
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
      <Route
        path="/tratamentos"
        element={
          <DashboardLayout>
            <TreatmentsPage />
          </DashboardLayout>
        }
      />
    </Router>
  );
}

export default DashboardRoutes;
