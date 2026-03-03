import "./index.css";
import MainPage from "./pages/MainPage";
import PromotionPage from "./pages/PromotionPage";
import PaymentPage from "./pages/PaymentPage";
import RentPage from "./pages/RentPage";
import SportPage from "./pages/SportPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import UserPage from "./pages/UserPage";
import EventsPage from "./pages/EventsPage";
import { useEffect } from "react";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/schedule" element={<Navigate to="/" replace />} />
        <Route path="/cinemas" element={<PlaceholderPage title="Кинотеатры" />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sport" element={<SportPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/offers" element={<PromotionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
