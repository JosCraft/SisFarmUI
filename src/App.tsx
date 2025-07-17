import { Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/private/dashboard/DashboardPage"
import ProductPage from "./pages/private/products/ProductPage"
import SalesPage from "./pages/private/sales/SalesPage"
import UsersPage from "./pages/private/users/UsersPage"
import ProvidersPage from "./pages/private/supptiers/SuppliersPage"
import CustomersPage from "./pages/private/customers/ClientPage"
import LoginPage from "./pages/public/login/LoginPage"
import LayoutDashboard from "./layout/LayoutDashboard"
import PharmacyPage from "./pages/private/pharmacy/PharmacyPage"
import PurchasesPage from "./pages/private/purchases/PurchasesPage"

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="farmacias" element={<PharmacyPage />} />
      <Route path="dashboard" element={<LayoutDashboard />} >
        <Route index element={<DashboardPage />} />
        <Route path="productos" element={<ProductPage />} />
        <Route path="ventas" element={<SalesPage />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="proveedores" element={<ProvidersPage />} />
        <Route path="clientes" element={<CustomersPage />} />
        <Route path="compras" element={<PurchasesPage />} />
      </Route>
    </Routes>
  )
}

export default App