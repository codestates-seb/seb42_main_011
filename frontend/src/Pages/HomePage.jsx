import React from 'react';
import PostDetailPage from './PostDetailPage';
import FeedList from '../components/Feeds/FeedList';
import useModal from '../hooks/useModal';

import Feeds from '../components/Feeds';

function HomePage() {
  const { closeModal, openModal } = useModal();

  const handleItemClick = id => {
    openModal(<PostDetailPage bulletinId={id} onClose={closeModal} />);
  };

  return (
    <Feeds>
      <FeedList onClick={handleItemClick} />
    </Feeds>
  );
}

export default HomePage;
