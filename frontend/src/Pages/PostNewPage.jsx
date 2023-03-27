import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import PostNew from '../components/PostNew';
import RetryErrorBoundary from '../components/RetryErrorBoundary';

function PostNewPage({ onClose }) {
  const memberId = useSelector(state => state.auth.user);
  console.log(memberId);

  return (
    <RetryErrorBoundary>
      <Suspense fallback={<div> 로딩중 </div>}>
        <PostNew onClose={onClose} memberId={memberId} />
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default PostNewPage;
