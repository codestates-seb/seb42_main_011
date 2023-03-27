import React from 'react';
import styled from 'styled-components';
import useInputs from '../../hooks/useInputs';
import { ReactComponent as IconComments } from '../../assets/icons/icon-comments.svg';

const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;

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

const Input = styled.textarea`
  width: 100%;
  padding-left: 12px;
  font-size: var(--font-size-16);
  font-weight: 500;
  line-height: 23px;

  resize: none;
  height: 23px;
`;

const StyledIconComments = styled(IconComments)`
  justify-items: flex-end;
  align-self: end;
  height: inherit;
`;

function CommentsForm({ onSubmit }) {
  const [{ commentContent }, onChange, reset] = useInputs({
    commentContent: '',
  });

  const handleKetDown = async event => {
    if (event.nativeEvent.isComposing) {
      // isComposing 이 true 이면조합 중이므로 동작을 막는다.
      return;
    }

    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      await onSubmit({ commentContent });
      reset();
    }
  };

  return (
    <Form>
      <StyledIconComments />
      <Input
        value={commentContent}
        name="commentContent"
        id="commentContent"
        placeholder="댓글 달기!"
        onChange={onChange}
        onKeyDown={handleKetDown}
        row={1}
      />
    </Form>
  );
}

export default CommentsForm;
