import React from 'react';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import ModalNonContent from '../UI/Modal/ModalNonContent';
import Card from '../UI/Card/Card';
import PostNewMap from './PostNewMap';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
  height: 100%;
  width: 100%;

  overflow-y: hidden;
  padding-top: 100px;
  padding: 90px 0 0 0;

  border-left: var(--border);
`;

const PostNewContent = styled(Card)`
  margin: 0 16px;

  width: calc(100% - 16px - 16px);
  min-height: 280px;
  padding: 14px 19px;

  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  resize: none;
`;

const LocationContainer = styled.div`
  padding: 10px 23px;
  border-top: var(--border);
  border-bottom: var(--border);

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;

const LocationText = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
`;

const LocationSelectButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
`;

function PostNew() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleClick = place => {
    console.log(place);
  };

  return (
    <Container>
      <PostNewContent tag="textarea" placeholder="입력해주세요" />
      <LocationContainer>
        <LocationText>
          사진에 있는 장소를 추천하고 싶으시다면 위치를 추가해주세요!
        </LocationText>
        <LocationSelectButton onClick={() => openModal()}>
          위치(선택)
        </LocationSelectButton>
      </LocationContainer>
      {isOpen && (
        <ModalNonContent wrapperId="kakao-modal" onClose={closeModal}>
          <PostNewMap onClick={handleClick} onClose={closeModal} />
        </ModalNonContent>
      )}
    </Container>
  );
}

export default PostNew;