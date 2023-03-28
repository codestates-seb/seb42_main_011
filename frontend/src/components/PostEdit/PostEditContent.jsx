import React, { useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

import Card from '../UI/Card/Card';

const ContentEdit = styled(Card)`
  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;
  min-height: 280px;
  padding: 12px 14px;
`;

function PostDetailContent({ postContent, onChange }) {
  const [content, debouncedValue, handleChange] = useInput(postContent, 200);

  useEffect(() => {
    onChange({ type: 'postContent', value: debouncedValue });
  }, [debouncedValue]);

  return (
    <ContentEdit
      tag="textarea"
      borderRadius="5px"
      value={content}
      onChange={handleChange}
    />
  );
}

export default PostDetailContent;
