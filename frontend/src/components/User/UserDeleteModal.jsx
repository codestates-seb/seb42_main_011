import React from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal/Modal';
import DeleteLogo from '../../assets/logo/delete_logo.svg';
import Button from '../UI/Button';

const NoFollowers = styled.div`
  width: 100%;
  line-height: 40px;
  font-weight: 500;
  margin: 80px 0 100px;
  text-align: center;
`;

const Important = styled.span`
  color: var(--color-tertiary);
`;

const DeleteButton = styled(Button)`
  background-color: var(--color-primary);
  margin-left: 100px;
  &:hover {
    background-color: var(--color-primary);
  }
`;

function FollowModal() {
  return (
    <Modal titleImage={DeleteLogo}>
      <NoFollowers>
        정말로 탈퇴 하시겠습니까? <br />
        탈퇴 이후 정보 <Important>(게시글, 댓글)</Important>는 되돌릴 수
        없습니다.
      </NoFollowers>
      <DeleteButton variant="medium">탈퇴</DeleteButton>
    </Modal>
  );
}

export default FollowModal;
