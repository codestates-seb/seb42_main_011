import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ErrorPage from './components/Pages/ErrorPage';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route element={<Layout displayHeader />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default Router;
