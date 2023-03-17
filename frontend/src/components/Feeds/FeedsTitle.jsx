import React from 'react';
import styled from 'styled-components';
import HomeLogo from '../../assets/logo/home_logo.svg';
import FriendLogo from '../../assets/logo/frined_logo.svg';
import useInputs from '../../hooks/useInputs';
import SearchInput from '../UI/SearchInput/SearchInput';
import DropdownFriend from '../UI/Dropdown/DropdownFriend';
import { ReactComponent as FriendShape } from '../../assets/shape/friend_shape.svg';

const FeedHeader = styled.section`
  width: 100%;
  height: 180px;
  display: flex;
  align-self: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: var(--color-light-0);
  background-color: unset;
  z-index: 99;
  padding-bottom: 16px;
`;

const FeedHeaderConatiner = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const TitleContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const Title = styled.h2`
  position: relative;
  height: 85px;
  padding: 24px 55px;
`;

const LogoImage = styled.img`
  position: absolute;
  width: 170px;
  height: 130px;
`;

const PageDescription = styled.p`
  font-size: var(--font-size-20);
  line-height: var(--line-height-20);
  font-weight: 500;
  z-index: 99;
  padding-left: 87px;
  padding-top: 32px;
`;

const FriendSearchWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 800px;
`;

const FriendSearchForm = styled.form`
  position: sticky;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 40%;
  z-index: 10;
`;

const FriendSearchInput = styled(SearchInput)`
  height: 50px;
  width: 100%;
`;

const FreindGreenShpate = styled(FriendShape)`
  position: fixed;
  width: 250px;
  height: 400px;
  top: 20px;
  right: 40px;
`;

function FeedsTitle({ title, description, serachOptions, onSearch }) {
  const [form, onChange, reset] = useInputs({
    search: '',
  });

  const handleSubmit = event => {
    if (event.key === 'Enter') {
      onSearch({ searchValue: form.search });
      reset();
    }
  };

  const isDisplaySearchInput = () => {
    if (onSearch && typeof onSearch === 'function') {
      return true;
    }

    return false;
  };

  return (
    <FeedHeader>
      <FeedHeaderConatiner>
        <TitleContainer>
          <Title>
            <LogoImage
              src={title === 'home' ? HomeLogo : FriendLogo}
              alt={title}
            />
          </Title>
          <PageDescription>{description}</PageDescription>
        </TitleContainer>
        {isDisplaySearchInput() && (
          <FriendSearchWrapper>
            <FriendSearchForm>
              <FriendSearchInput
                onKeyDown={handleSubmit}
                name="search"
                id="search"
                placeholder="검색"
                onChange={onChange}
              />
              <DropdownFriend
                defaultDlsplayText="필터"
                options={serachOptions}
              />
            </FriendSearchForm>
          </FriendSearchWrapper>
        )}
        {title === 'home' ? null : <FreindGreenShpate />}
      </FeedHeaderConatiner>
    </FeedHeader>
  );
}

export default FeedsTitle;
