import React, { useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';

import { ReactComponent as IconComments } from '../../assets/icons/icon-comments.svg';
import useCreateComments from '../../hooks/comments/useCreateComments';
import useAxiosErrorModal from '../../hooks/useAxiosErrorModal';

const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 98.5%;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: -3px;
    height: 2px;
    width: 105%;
    background: var(--color-dark-0);
  }
`;

const Input = styled.input`
  width: 100%;
  padding-left: 12px;
  font-size: var(--font-size-16);
  font-weight: 500;
  line-height: 23px;

  resize: none;
  height: 23px;

  /* :invalid {
    position: absolute;
    bottom: 100%;
    left: 0;
  } */
`;

const Button = styled.button`
  margin-left: -3px;
  height: inherit;
`;

const StyledIconComments = styled(IconComments)`
  justify-items: flex-end;
  align-self: end;
  height: inherit;
`;

function CommentsForm({ bulletinId }) {
  const queryClient = useQueryClient();
  const onError = useAxiosErrorModal();

  const [commentContent, setCommentContent] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    if (value.length > 120) {
      event.target.setCustomValidity('최대 120자까지만 입력하실 수 있습니다!');
    } else {
      event.target.setCustomValidity('');
    }

    setCommentContent(value);
  };

  const { mutateAsync: commentMutate } = useCreateComments({
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
    },
    onError,
  });

  const handleCommentSubmit = async newCommentContent => {
    await commentMutate({
      commentContent: newCommentContent,
      bulletinPostId: bulletinId,
    });
  };

  const handleSubmit = async event => {
    if (commentContent.length === 0 || commentContent.length > 120) {
      return;
    }

    event.preventDefault();

    await handleCommentSubmit(commentContent);
    setCommentContent('');
  };

  const handleKetDown = async event => {
    if (event.nativeEvent.isComposing) {
      // isComposing 이 true 이면조합 중이므로 동작을 막는다.
      return;
    }

    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }

    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <Form>
      <Button onClick={handleSubmit}>
        <StyledIconComments />
      </Button>
      <Input
        value={commentContent}
        name="commentContent"
        id="commentContent"
        placeholder="댓글 달기!"
        onChange={handleChange}
        onKeyDown={handleKetDown}
        row={1}
        required
      />
    </Form>
  );
}

export default CommentsForm;
