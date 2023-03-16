import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ErrorPage from './Pages/ErrorPage';
import HomePage from './Pages/HomePage';
import UserAboutmePage from './Pages/UserAboutmePage';
import UserFeedPage from './Pages/UserFeedPage';
import UserPlacePage from './Pages/UserPlacePage';
import NonHeaderLayout from './components/Layout/NonHeaderLayout';

function Router() {
  return (
    <Routes>
      <Route element={<NonHeaderLayout displayBgimg />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route element={<Layout displayHeader />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<Layout displayHeader displayProfile displayFlex />}>
        <Route path="/mypage" element={<UserAboutmePage />} />
        <Route path="/mypage/feed" element={<UserFeedPage />} />
        <Route path="/mypage/place" element={<UserPlacePage />} />
        <Route path="/friendpage" element={<UserAboutmePage />} />
        <Route path="/friendpage/feed" element={<UserFeedPage />} />
        <Route path="/friendpage/place" element={<UserPlacePage />} />
      </Route>
    </Routes>
  );
}

export default Router;
