import { useRef, useState, forwardRef } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { updateUser } from '../../api/userApi';
import useModal from '../../hooks/useModal';
import Button from '../UI/Button';
import ModalBase from '../UI/Modal/ModalBase';
import UserpageProfile from '../UI/UserpageProfile';

const ImageWrapper = styled.section`
  align-items: center;
  width: 100%;
  min-width: 400px;
  max-width: 550px;
`;

const ProfilePicture = styled.div`
  position: relative;
  width: 100%;
  min-width: 400px;
  max-width: 550px;
  height: 100%;
  aspect-ratio: 7.9 / 10;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const ProfileImg = styled(
  forwardRef((props, ref) => <UserpageProfile {...props} forwardedRef={ref} />),
)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-width: 400px;
  max-height: 666px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageChangeBtn = styled(Button)`
  margin-top: 5px;
  margin-left: -15px;
  background-color: var(--color-dark-0);
  &:hover {
    background-color: var(--color-primary);
  }
`;

function ImageUpload({ profileUrl, memberId, nickname, aboutMe }) {
  const { openModal } = useModal();
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [Image, setImage] = useState(profileUrl);
  const [file, setFile] = useState(null);
  const updateUserMutation = useMutation(updateUser);

  console.log(file);

  // File select window
  const handleImageUpload = () => {
    imageUploader.current.click();
  };

  const handleFileSelection = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Click api call (profileImage)
  const handleUpdateProfileImg = async () => {
    try {
      if (file) {
        await updateUserMutation.mutateAsync(
          {
            memberId,
            profileImage: file,
            nickname,
            aboutMe,
          },
          {
            onSuccess: () => {
              openModal(
                <ModalBase
                  title="IMAGE"
                  content="프로필 이미지 변경 완료! :)"
                  buttons={<Button>확인</Button>}
                />,
              );
            },
            onError: () => {
              openModal(
                <ModalBase
                  title="IMAGE"
                  content="프로필 이미지 변경에 실패했어요 :/"
                  buttons={<Button>확인</Button>}
                />,
              );
            },
          },
        );

        setImage(URL.createObjectURL(file)); // Image preview update
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageWrapper>
      <input
        type="file"
        accept="image/jpg, image/png, image/gif"
        onChange={handleFileSelection}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
      />
      <ProfilePicture role="presentation">
        <ProfileImg
          src={Image}
          forwardedRef={uploadedImage}
          alt="프로필 이미지"
        />
      </ProfilePicture>
      <BtnWrapper>
        <ImageChangeBtn
          variant="medium"
          onClick={event => {
            handleImageUpload(event);
          }}
        >
          이미지 변경
        </ImageChangeBtn>
        <ImageChangeBtn
          variant="medium"
          onClick={event => handleUpdateProfileImg(event)}
        >
          이미지 저장
        </ImageChangeBtn>
      </BtnWrapper>
    </ImageWrapper>
  );
}
export default ImageUpload;
