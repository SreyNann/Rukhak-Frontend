import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarItem } from "@/components/admin/SidebarItem";
import { LayoutDashboard, ClipboardList, Package } from "lucide-react";
import { ProductsFilterContextProvider } from "@/contexts/seller/ProductsFilterContext";
import Sidebar from "@/components/admin/Sidebar";
import ProductManagement from "./ProductManagement";
import ProductDetail from "./ProductDetail";
import "@/styles/seller/seller.scss";
import { ProductFormContextProvider } from "@/contexts/seller/ProductFormContext";

const SellerHome = () => {
  return (
    <div className="seller-home">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert
          to="/seller/dashboard"
        />

        <SidebarItem
          icon={<ClipboardList size={20} />}
          text="Product Management"
          to="/seller/products"
        />

        <SidebarItem
          icon={<Package size={20} />}
          text="Order Management"
          to="/seller/orders"
        />
      </Sidebar>
      <main className="container">
        <Routes>
          <Route path="/dashboard" element={<div>Hello dash board</div>} />
          <Route
            path="/products"
            element={
              <ProductsFilterContextProvider>
                <ProductManagement />
              </ProductsFilterContextProvider>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductFormContextProvider>
                <ProductDetail />
              </ProductFormContextProvider>
            }
          />
          <Route path="/orders" element={<div>Hello order list</div>} />
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default SellerHome;
