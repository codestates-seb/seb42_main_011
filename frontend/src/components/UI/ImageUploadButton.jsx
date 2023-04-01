import styled from 'styled-components';
import { FlexJustifyAlignCenter } from '../../styles/shared';
import Button from './Button';

const UploadButton = styled(Button)`
  margin-top: 5px;
  margin-left: -15px;
  background-color: var(--color-dark-0);
  width: 120px;
  height: 50px;
  ${FlexJustifyAlignCenter}
  text-align: center;

  &:hover {
    background-color: var(--color-primary);
  }
`;

function ImageUploadButton({ onUplad, children }) {
  const handleUpload = evnet => {
    const file = evnet.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise(resolve => {
      reader.onload = () => {
        onUplad(reader.result || null, file); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  return (
    <>
      <UploadButton htmlFor="upload-button" tag="label" variant="medium">
        {children}
      </UploadButton>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        id="upload-button"
        name="upload-button"
        onChange={handleUpload}
        hidden
      />
    </>
  );
}

export default ImageUploadButton;
