import "./index.css";
import MainPage from "./pages/MainPage";
import PromotionPage from "./pages/PromotionPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/schedule"
        element={<PlaceholderPage title="Расписание" />}
      />
      <Route path="/cinemas" element={<PlaceholderPage title="Кинотеатры" />} />
      <Route path="/offers" element={<PromotionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
