import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PostDetailPage from './PostDetailPage';
import useModal from '../hooks/useModal';

import Feeds from '../components/Feeds';
import PlaceFeedList from '../components/Feeds/PlaceFeedList';

function AmenityPage() {
  const { closeModal, openModal } = useModal();
  const { amenityId } = useParams();
  const [searchParams] = useSearchParams();
  const amenityName = searchParams.get('name');

  const handleItemClick = id => {
    openModal(<PostDetailPage bulletinId={id} onClose={closeModal} />);
  };
  return (
    <Feeds amenityName={amenityName}>
      <PlaceFeedList onClick={handleItemClick} amenityId={amenityId} />
    </Feeds>
  );
}

export default AmenityPage;
