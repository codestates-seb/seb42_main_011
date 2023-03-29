import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostDetailPage from './PostDetailPage';
import useModal from '../hooks/useModal';

import Feeds from '../components/Feeds';
import PlaceFeedList from '../components/Feeds/PlaceFeedList';

function AmenityPage() {
  const { closeModal, openModal } = useModal();
  const { amenityId } = useParams();
  const location = useLocation();
  const amenityName = location.state?.amenityName;

  const handleItemClick = id => {
    openModal(<PostDetailPage bulletinId={id} onClose={closeModal} />);
  };
  return (
    <Feeds amenityId={amenityId} amenityName={amenityName}>
      <PlaceFeedList onClick={handleItemClick} amenityId={amenityId} />
    </Feeds>
  );
}

export default AmenityPage;
