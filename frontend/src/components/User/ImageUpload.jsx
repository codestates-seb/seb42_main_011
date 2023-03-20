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
  &:hover {
    background-color: var(--color-primary);
  }
`;

function ImageUpload({ photoUrl }) {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [Image, setImage] = useState(photoUrl);

  const handleImageUpload = event => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <ImageWrapper>
      <input
        type="file"
        accept="image/jpg, image/png"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
      />
      <ProfilePicture role="presentation">
        <ProfileImg src={Image} forwardedRef={uploadedImage} alt="" />
      </ProfilePicture>
      <BtnWrapper>
        <ImageChangeBtn
          variant="medium"
          onClick={() => imageUploader.current.click()}
        >
          이미지 변경
        </ImageChangeBtn>
      </BtnWrapper>
    </ImageWrapper>
  );
}
export default ImageUpload;
