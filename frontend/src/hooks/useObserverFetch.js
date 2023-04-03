import { useEffect, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

function useObserverFetch({ isLastItem, onFetch, rootMargin = '100px' }) {
  const ref = useRef(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver({
    rootMargin,
    targetRef: ref,
  });

  const isIntersecting = !!entry?.isIntersecting; // 겹치는 영역이 존재하는 지 여부

  useEffect(() => {
    if (isLastItem && isIntersecting) onFetch(); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [isIntersecting, isLastItem]);

  return { ref };
}

export default useObserverFetch;
