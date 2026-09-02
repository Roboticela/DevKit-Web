import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { DevKitPremiumRoute } from "./pages/DevKitPremiumRoute";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/devkit-premium/:assetId" element={<DevKitPremiumRoute />} />
      <Route path="*" element={<main className="p-8"><p>Not found</p><Link to="/">Home</Link></main>} />
    </Routes>
  );
}
