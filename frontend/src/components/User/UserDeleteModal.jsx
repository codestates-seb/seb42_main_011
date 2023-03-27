import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/services/auth.service';
import { deleteUser } from '../../api/userApi';
import useModal from '../../hooks/useModal';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button';
import DeleteLogo from '../../assets/logo/delete_logo.svg';

import ModalBase from '../UI/Modal/ModalBase';

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

function UserDeleteModal({ memberId }) {
  const deleteUserMutation = useMutation(deleteUser);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await deleteUserMutation.mutateAsync(
        {
          memberId,
        },
        {
          onSuccess: () => {
            logout();

            openModal(
              <ModalBase
                title="INFO"
                content="회원탈퇴 완료! :)"
                buttons={<Button>확인</Button>}
              />,
            );
          },
          onError: () => {
            openModal(
              <ModalBase
                title="INFO"
                content="회원탈퇴에 실패했어요 :/"
                buttons={<Button>확인</Button>}
              />,
            );
          },
        },
      );

      navigate('/bye');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal titleImage={DeleteLogo}>
      <NoFollowers>
        정말로 탈퇴 하시겠습니까? <br />
        탈퇴 이후 정보 <Important>(게시글, 댓글)</Important>는 되돌릴 수
        없습니다.
      </NoFollowers>
      <DeleteButton variant="medium" onClick={handleDelete}>
        탈퇴
      </DeleteButton>
    </Modal>
  );
}

export default UserDeleteModal;
