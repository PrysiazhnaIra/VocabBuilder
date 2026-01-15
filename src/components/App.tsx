import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";


const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const RegisterForm = lazy(() => import("./RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("./LoginForm/LoginForm"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const Header = lazy(() => import("./Header/Header"));
const DictionaryPage = lazy(() => import("../pages/DictionaryPage/DictionaryPage"));
const RecommendPage = lazy(() => import("../pages/RecommendPage/RecommendPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage/TrainingPage"));



export default function App() {
  const { isLoggedIn } = useAuth();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<AuthPage />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/profile" element={<ProfilePage />}/>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Suspense>
  );
}
