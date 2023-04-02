import { useMutation } from 'react-query';
import { updateUser } from '../api/userApi';
import Button from '../components/UI/Button';
import ModalBase from '../components/UI/Modal/ModalBase';
import useModal from './useModal';

export default function useUserUpdate(memberId, file, navigate) {
  const { openModal } = useModal();
  const updateUserMutation = useMutation(updateUser);

  const handleUpdate = async (UserNickname, UserAboutMe) => {
    try {
      await updateUserMutation.mutateAsync(
        {
          memberId,
          profileImage: file,
          nickname: UserNickname,
          aboutMe: UserAboutMe,
        },
        {
          onSuccess: () => {
            openModal(
              <ModalBase
                title="INFO"
                content="회원정보 변경 완료! :)"
                buttons={<Button>확인</Button>}
              />,
            );
          },
          onError: () => {
            openModal(
              <ModalBase
                title="INFO"
                content="회원정보 변경에 실패했어요 :/"
                buttons={<Button>확인</Button>}
              />,
            );
          },
        },
      );

      navigate(`/user/${memberId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleUpdate };
}
