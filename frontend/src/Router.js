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
import FindPasswordPage from './Pages/FindPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ByePage from './Pages/ByePage';
import FriendSearchPage from './Pages/FriendSearchPage';
import UserEditPage from './Pages/UserEditPage';
import PlacePage from './Pages/PlacePage';
import InfoPage from './Pages/InfoPage';
import AmenityPage from './Pages/AmenityPage';

function Router() {
  return (
    <Routes>
      <Route element={<NonHeaderLayout displayBgimg />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/password/find" element={<FindPasswordPage />} />
        <Route path="/password/reset" element={<ResetPasswordPage />} />
        <Route path="/bye" element={<ByePage />} />
      </Route>
      <Route element={<Layout displayHeader />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/friend/search" element={<FriendSearchPage />} />
        <Route path="/place" element={<PlacePage />} />
        <Route path="/amenity/:amenityId" element={<AmenityPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Route>

      <Route element={<Layout displayHeader displayProfile displayFlex />}>
        <Route path="/user/:memberId" element={<UserAboutmePage />} />
        <Route path="/user/:memberId/feed" element={<UserFeedPage />} />
        <Route path="/user/:memberId/place" element={<UserPlacePage />} />
      </Route>

      <Route element={<Layout displayHeader displayFlex />}>
        <Route path="/user/:memberId/edit" element={<UserEditPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
