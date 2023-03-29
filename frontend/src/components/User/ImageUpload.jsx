import { useRef, useState, forwardRef } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
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
  &:first-of-type {
    margin-right: 20px;
  }
  &:hover {
    background-color: var(--color-primary);
  }
`;

function ImageUpload({ profileUrl, nickname, setFile }) {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [Image, setImage] = useState(
    profileUrl ??
      'https://cdn-icons-png.flaticon.com/512/1130/1130933.png?w=2000&t=st=1680005925~exp=1680006525~hmac=8e8077d62e937c5ca56e24827f856a436440d7fb244eff53af34fffddc88d213',
  );

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

  const handleUpdateProfileImg = () => {
    handleImageUpload();
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
          alt={`${nickname}의프로필 이미지`}
        />
      </ProfilePicture>
      <BtnWrapper>
        <ImageChangeBtn variant="medium" onClick={handleUpdateProfileImg}>
          이미지 변경
        </ImageChangeBtn>
      </BtnWrapper>
    </ImageWrapper>
  );
}

export default ImageUpload;
