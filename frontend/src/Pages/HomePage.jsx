import React, { lazy, Suspense } from 'react';
import RetryErrorBoundary from '../components/RetryErrorBoundary';
import PostDetailPage from './PostDetailPage';
import FeedList from '../components/Feeds/FeedList';
import useModal from '../hooks/useModal';

const Feeds = lazy(() => import('../components/Feeds'));

function UserProfileLoading() {
  return <div> 사용자 정보를 불러오는 중입니다. </div>;
}

function HomePage() {
  const { closeModal, openModal } = useModal();

  const handleItemClick = id => {
    openModal(<PostDetailPage postId={id} onClose={closeModal} />);
  };

  return (
    <Feeds>
      <RetryErrorBoundary>
        <Suspense fallback={<UserProfileLoading />}>
          <FeedList onClick={handleItemClick} />
        </Suspense>
      </RetryErrorBoundary>
    </Feeds>
  );
}

export default HomePage;
