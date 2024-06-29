import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetCars from "./Page/GetCars";
import HomePage from "./Page/Home";
import ProtectedRoute from "./dashboard/ProtectedPage";
import LoginPage from "./dashboard/LoginPage";
import AdminPage from "./dashboard/AdminPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UpdatePage from "./dashboard/UpdatePage";
import CreatePage from "./dashboard/CreateCar";
import { ApiProvider } from "./Context/ApiContext";

const CLIENT_ID =
  "60480331234-8u31ccmifsgmtnfc2podsteg0apeptp5.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ApiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="cars" element={<GetCars />} />
                    <Route path="cars/add" element={<CreatePage />} />
                    <Route path="cars/:id" element={<UpdatePage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
