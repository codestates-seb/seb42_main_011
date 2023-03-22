import { useEffect, useState } from 'react';

function useIntersectionObserver({
  targetRef,
  threshold = 0,
  root = null,
  rootMargin = '0%',
}) {
  const [entry, setEntry] = useState();

  const isIntersecting = entry?.isIntersecting;
  const updateEntry = entries => {
    setEntry(entries[0]);
  };

  useEffect(() => {
    const target = targetRef?.current; // DOM Ref
    if (isIntersecting || !target) {
      return undefined;
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef, threshold, root, rootMargin, isIntersecting]);

  return entry;
}

export default useIntersectionObserver;
