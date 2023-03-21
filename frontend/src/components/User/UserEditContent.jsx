import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';

const EditBox = styled.form`
  width: 100%;
  height: 100%;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const AboutMe = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.label`
  font-size: var(--font-size-24);
  font-weight: 500;
  color: var(--color-tertiary);
  margin-bottom: 20px;
`;

const NicknameInput = styled.input`
  width: 200px;
  height: 60px;
  border: var(--border);
  font-size: var(--font-size-20);
  font-weight: 500;
  text-indent: 1rem;
  &:focus {
    border: none;
    outline: 1.5px solid var(--color-primary);
  }
`;

const ErrorMessage = styled.span`
  color: var(--color-tertiary);
  margin-top: 10px;
`;

const AboutmeTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  max-height: 600px;
  border: var(--border);
  font-size: var(--font-size-20);
  line-height: 40px;
  aspect-ratio: 1 /1;
  padding: 1rem;
  resize: none;
  &:focus {
    border: none;
    outline: 1.5px solid var(--color-primary);
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBtn = styled(Button)`
  background-color: var(--color-primary);
  &:hover {
    background-color: var(--color-primary);
  }
  margin-right: 10px;
`;

const CancelBtn = styled(Button)`
  background-color: var(--color-dark-0);
  &:hover {
    background-color: var(--color-tertiary);
  }
`;

function UserEditContent({ onCancel, userdata }) {
  const [UserNickname, setUserNickname] = useState(userdata[0].data.nickname);
  const [UserAboutMe, setUserAboutMe] = useState(userdata[0].data.aboutMe);
  const [nicknameError, setNicknameError] = useState('');
  const handleNicknameChange = event => {
    const { value } = event.target;
    if (value.length < 4 || value.length > 10) {
      setNicknameError('닉네임은 4-10자 사이로 작성 해주세요.');
    } else {
      setNicknameError('');
    }
    setUserNickname(value);
  };

  const handleAboutMeChange = event => {
    setUserAboutMe(event.target.value);
  };
  return (
    <EditBox>
      <Nickname>
        <Title>닉네임</Title>
        <NicknameInput
          type="text"
          name="userNickname"
          value={UserNickname}
          maxLength={10}
          onChange={handleNicknameChange}
          autoFocus
          required
        />
        {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
      </Nickname>
      <AboutMe>
        <Title>소개</Title>
        <AboutmeTextarea
          type="textarea"
          name="UserAboutMe"
          value={UserAboutMe}
          maxLength={250}
          placeholder="내용을 입력해주세요!"
          onChange={handleAboutMeChange}
          required
        />
      </AboutMe>
      <BtnWrapper>
        <ConfirmBtn variant="medium">확인</ConfirmBtn>
        <CancelBtn variant="medium" onClick={onCancel}>
          취소
        </CancelBtn>
      </BtnWrapper>
    </EditBox>
  );
}

export default UserEditContent;
