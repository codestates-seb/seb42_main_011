import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconSeeMore } from '../../assets/icons/icon-see-more-small.svg';
import Card from '../UI/Card/Card';

const StyledCommenstItem = styled(Card)`
  flex: 1 1 0;
  min-height: 80px;
  padding: 10px;
  transform: translate(-0.25rem, -0.25rem);
  box-shadow: 4px 4px 0 0 var(--color-dark-0);

  display: flex;
  align-items: start;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;

  object-fit: cover;
  object-position: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;

const Nickname = styled.div`
  font-weight: 500;
  font-size: var(--font-size-20);
  line-height: 29px;
`;

const DogName = styled.div`
  color: var(--color-primary);
  font-weight: 500;
  font-size: var(--font-size-13);
  line-height: 19px;
`;

const Content = styled.div`
  flex: 1 1 0;
  align-self: center;
  font-weight: 500;
  font-size: var(--font-size-13);
  line-height: 30px;
`;

const EditButton = styled.button`
  align-self: center;
  padding-right: 7px;
`;

const EditIcon = styled(IconSeeMore)`
  height: 24px;
  width: 24px;
`;

function CommentsItem({
  commentId,
  commentContent,
  nickName,
  dogName,
  profileUrl,
}) {
  return (
    <StyledCommenstItem borderRadius="5px" tag="li" data-comment-id={commentId}>
      <Avatar src={profileUrl} alt="" />
      <NameContainer>
        <Nickname>{nickName}</Nickname>
        <DogName>{dogName}</DogName>
      </NameContainer>
      <Content>{commentContent}</Content>
      <EditButton>
        <EditIcon />
      </EditButton>
    </StyledCommenstItem>
  );
}

export default CommentsItem;
