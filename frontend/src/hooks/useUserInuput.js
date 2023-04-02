import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

export default function useUserInput(initialNickname, initialAboutMe) {
  const [UserNickname, setUserNickname] = useState(initialNickname);
  const [UserAboutMe, setUserAboutMe] = useState(initialAboutMe || '');
  const [aboutMeError, setAboutMeError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [inputCount, setInputCount] = useState(UserAboutMe.length);
  const MAX_LINES = 5;

  const debouncedNickname = useDebounce(UserNickname, 100);
  const debouncedAboutMe = useDebounce(UserAboutMe, 100);

  useEffect(() => {
    if (debouncedNickname.length < 2 || debouncedNickname.length > 10) {
      setNicknameError('닉네임은 10자 이하로 작성 해주세요.');
    } else {
      setNicknameError('');
    }
  }, [debouncedNickname]);

  useEffect(() => {
    if (debouncedAboutMe) {
      const lineCount = (debouncedAboutMe.match(/\n/g) || []).length + 1;
      if (lineCount > MAX_LINES || inputCount > 100) {
        setAboutMeError(
          `소개는 100자 이하, ${MAX_LINES}줄까지 입력 가능합니다.`,
        );
      } else {
        setAboutMeError('');
      }
    }
  }, [debouncedAboutMe]);

  useEffect(() => {
    setInputCount(UserAboutMe.length || 0);
  }, [UserAboutMe]);

  return {
    UserNickname,
    setUserNickname,
    UserAboutMe,
    setUserAboutMe,
    aboutMeError,
    nicknameError,
    inputCount,
  };
}
