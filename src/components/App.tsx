import { Suspense } from "react";
import DictionaryPage from "../pages/DictionaryPage/DictionaryPage";
import RecommendPage from "../pages/RecommendPage/RecommendPage";
import TrainingPage from "../pages/TrainingPage/TrainingPage";

import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Header from "./Header/Header";
import { useAuth } from "../hooks/useAuth";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import AuthPage from "../pages/AuthPage/AuthPage";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";

export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<AuthPage />}>
              <Route index element={<Navigate to="register" replace />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/training" element={<TrainingPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Suspense>
  );
}
