import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Button from '../UI/Button';
import useUserInput from '../../hooks/useUserInuput';
import useUserUpdate from '../../hooks/useUserUpdate';

const EditBox = styled.form`
  width: 100%;
  height: 100%;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media screen and (max-height: 750px) {
    margin-bottom: 10px;
  }
`;

const AboutMe = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media screen and (max-height: 750px) {
    margin-bottom: 10px;
  }
`;

const Title = styled.label`
  font-size: var(--font-size-24);
  font-weight: 500;
  color: var(--color-tertiary);
  margin-bottom: 20px;

  & span {
    color: var(--color-primary);
    font-size: var(--font-size-16);
    margin-left: 10px;
  }

  @media screen and (max-height: 750px) {
    font-size: var(--font-size-20);
    margin-bottom: 10px;
  }
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

  @media screen and (max-height: 750px) {
    height: 50px;
  }
`;

const ErrorMessage = styled.span`
  color: var(--color-tertiary);
  display: block;
  margin-top: 10px;
`;

const AboutmeTextarea = styled.textarea`
  width: 100%;
  min-height: 140px;
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

  @media screen and (max-height: 750px) {
    height: 50px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBtn = styled(Button)`
  background-color: var(--color-primary);
  margin-right: 10px;
  &:hover {
    background-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const CancelBtn = styled(Button)`
  background-color: pink;
  background-color: var(--color-dark-0);
  &:hover {
    background-color: var(--color-tertiary);
  }
`;

function UserEditContent({ onCancel, memberId, nickname, aboutMe, file }) {
  const {
    UserNickname,
    setUserNickname,
    UserAboutMe,
    setUserAboutMe,
    aboutMeError,
    nicknameError,
    inputCount,
  } = useUserInput(nickname, aboutMe);

  const navigate = useNavigate();
  const { handleUpdate } = useUserUpdate(memberId, file, navigate);

  const handleAboutMeChange = event => {
    const { value } = event.target;
    setUserAboutMe(value);
  };

  const handleNicknameChange = event => {
    const { value } = event.target;
    setUserNickname(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleUpdate(UserNickname, UserAboutMe);
  };

  const isFormValid = () =>
    !nicknameError && !aboutMeError && UserNickname.length > 1;

  return (
    <EditBox onSubmit={handleSubmit}>
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
        {nicknameError && (
          <Fade bottom>
            <ErrorMessage>{nicknameError}</ErrorMessage>
          </Fade>
        )}
      </Nickname>
      <AboutMe>
        <Title>
          소개 <span>{inputCount}/ 100자</span>
        </Title>
        <AboutmeTextarea
          type="textarea"
          name="UserAboutMe"
          value={UserAboutMe}
          maxLength={100}
          placeholder="내용을 입력해주세요!"
          onChange={handleAboutMeChange}
          required
        />
        {aboutMeError && (
          <Fade bottom>
            <ErrorMessage>{aboutMeError}</ErrorMessage>
          </Fade>
        )}
      </AboutMe>
      <BtnWrapper>
        <ConfirmBtn variant="medium" disabled={!isFormValid()}>
          확인
        </ConfirmBtn>
        <CancelBtn variant="medium" onClick={onCancel}>
          취소
        </CancelBtn>
      </BtnWrapper>
    </EditBox>
  );
}

export default UserEditContent;
