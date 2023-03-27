import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
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

const PostNewContentCard = styled(Card)`
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
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const LactionButtonContainer = styled.div`
  flex: 1 1 0;
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
  color: #097bed;
`;

const SelectedLocation = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  word-break: keep-all;
  max-width: 120px;
`;

function PostNewContent({ onContentChange, onSelectPlace }) {
  const { openModal, closeModal } = useModal();
  const [content, dValue, setContent] = useInput('', 300);
  const [place, setPlace] = useState();

  useEffect(() => {
    onContentChange(content);
  }, [dValue]);

  const handleSelect = newPlace => {
    onSelectPlace(newPlace);
    setPlace(newPlace);
  };

  const handleLoactionSelectClick = () => {
    openModal(<PostNewMap onSelect={handleSelect} onClose={closeModal} />);
  };

  return (
    <Container>
      <PostNewContentCard
        onChange={setContent}
        tag="textarea"
        placeholder="입력해주세요"
        value={content}
      />
      <LocationContainer>
        <LactionButtonContainer>
          <LocationText>
            사진에 있는 장소를 추천하고 싶으시다면 위치를 추가해주세요!
          </LocationText>
          <LocationSelectButton
            type="button"
            onClick={handleLoactionSelectClick}
          >
            {place ? '위치(수정)' : '위치(선택)'}
          </LocationSelectButton>
        </LactionButtonContainer>
        {place && <SelectedLocation>{place.place_name} </SelectedLocation>}
      </LocationContainer>
    </Container>
  );
}

export default PostNewContent;
