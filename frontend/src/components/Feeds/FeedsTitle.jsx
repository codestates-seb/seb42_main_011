import React from 'react';
import styled from 'styled-components';
import HomeLogo from '../../assets/logo/home_logo.svg';
import useInputs from '../../hooks/useInputs';
import SearchInput from '../UI/SearchInput/SearchInput';
import DropdownFriend from '../UI/Dropdown/DropdownFriend';

const FeedHeader = styled.section`
  width: 100%;
  height: 180px;
  display: flex;
  align-self: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: var(--color-light-0);
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

const FriendSearchForm = styled.form`
  position: relative;
  top: 50%;
  left: calc(50% - 164px);
`;

const FriendSearchInput = styled(SearchInput)`
  flex: 0 1 500px;

  height: 50px;
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
            <LogoImage src={HomeLogo} alt={title} />
          </Title>
          <PageDescription>{description}</PageDescription>
        </TitleContainer>
        {isDisplaySearchInput() && (
          <FriendSearchForm>
            <DropdownFriend options={serachOptions} />
            <FriendSearchInput
              onKeyDown={handleSubmit}
              name="search"
              id="search"
              placeholder="검색"
              onChange={onChange}
            />
          </FriendSearchForm>
        )}
      </FeedHeaderConatiner>
    </FeedHeader>
  );
}

export default FeedsTitle;
