import "./index.css";
import MainPage from "./pages/MainPage";
import PromotionPage from "./pages/PromotionPage";
import PaymentPage from "./pages/PaymentPage";
import RentPage from "./pages/RentPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/schedule" element={<Navigate to="/" replace />} />
      <Route path="/cinemas" element={<PlaceholderPage title="Кинотеатры" />} />
      <Route path="/events" element={<PlaceholderPage title="События" />} />
      <Route path="/sport" element={<PlaceholderPage title="Спорт" />} />
      <Route path="/rent" element={<RentPage />} />
      <Route path="/offers" element={<PromotionPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
