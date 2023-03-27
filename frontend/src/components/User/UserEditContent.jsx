import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { updateUser } from '../../api/userApi';
import Button from '../UI/Button';
import useDebounce from '../../hooks/useDebounce';
import ModalBase from '../UI/Modal/ModalBase';
import useModal from '../../hooks/useModal';

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

function UserEditContent({ onCancel, memberId, nickname, aboutMe }) {
  const { openModal } = useModal();
  const [UserNickname, setUserNickname] = useState(nickname);
  const [UserAboutMe, setUserAboutMe] = useState(aboutMe);
  const [aboutMeError, setAboutMeError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const updateUserMutation = useMutation(updateUser);
  const navigate = useNavigate();
  const MAX_LINES = 7;

  // Debounce input changes
  const debouncedNickname = useDebounce(UserNickname, 100);
  const debouncedAboutMe = useDebounce(UserAboutMe, 100);

  // Debounce Nickname
  useEffect(() => {
    if (debouncedNickname.length < 4 || debouncedNickname.length > 10) {
      setNicknameError('닉네임은 4-10자 사이로 작성 해주세요.');
    } else {
      setNicknameError('');
    }
  }, [debouncedNickname]);

  // Debounce Aboutme
  useEffect(() => {
    const lineCount = (debouncedAboutMe.match(/\n/g) || []).length + 1;
    if (lineCount > MAX_LINES) {
      setAboutMeError(`소개는 ${MAX_LINES}줄까지 입력 가능합니다.`);
    } else {
      setAboutMeError('');
    }
  }, [debouncedAboutMe]);

  const handleAboutMeChange = event => {
    const { value } = event.target;
    setUserAboutMe(value);
  };

  const handleNicknameChange = event => {
    const { value } = event.target;
    setUserNickname(value);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateUserMutation.mutateAsync(
        {
          memberId,
          nickname: UserNickname,
          aboutMe: UserAboutMe,
          accessToken: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjo4LCJ1c2VybmFtZSI6ImF3ZWFzZEBtdW5nZmx1ZW5jZXIuY29tIiwic3ViIjoiYXdlYXNkQG11bmdmbHVlbmNlci5jb20iLCJpYXQiOjE2Nzk2MjAzMjgsImV4cCI6MTY3OTk2NTkyOH0.PrPMxPM5jFZF8fpiuCbuzcgtUZ-vfwyvg8u49TslrD0WwK_eMNaaoLG3o-QJJbZAuggZyJ-4YildiF4dPs1Aeg`,
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

  return (
    <EditBox onSubmit={handleUpdate}>
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
        {aboutMeError && <ErrorMessage>{aboutMeError}</ErrorMessage>}
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