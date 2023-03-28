import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: 5px;
  background-color: var(--color-light-0);
  z-index: 999;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  width: 64px;
  height: 32px;
  border-radius: 5px;
  background-color: var(--color-light-0);

  :hover {
    color: var(--color-light-0);
    background-color: var(--color-secondary);
    border-radius: 5px;

    &:first-of-type {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }

  & + & {
    border-top: var(--border);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

function EditAndRemoveButton({
  onEdit,
  onDelete,
  className,
  onOutsideClick = () => {},
}) {
  const handleOutsideClick = event => {
    console.log(event.target);

    if (event.target.matches('Button')) {
      return;
    }

    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Container className={className}>
      <Button onClick={onEdit}>수정</Button>
      <Button onClick={onDelete}>삭제</Button>
    </Container>
  );
}

export default EditAndRemoveButton;
