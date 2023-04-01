import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ReactComponent as IconSeeMore } from '../../assets/icons/icon-see-more-small.svg';
import { ReactComponent as IconCancle } from '../../assets/icons/icon-cancle.svg';
import { ReactComponent as IconCheck } from '../../assets/icons/icon-check.svg';

import { FlexJustifyAlignCenter } from '../../styles/shared';
import Card from '../UI/Card/Card';
import EditAndRemoveButton from '../UI/EditAndRemoveButton';
import useModal from '../../hooks/useModal';
import useImageError from '../../hooks/useImageError';

const StyledCommenstItem = styled(Card)`
  width: 100%;
  height: 100%;

  min-height: 80px;
  padding: 10px;
  /* transform: translate(-0.25rem, -0.25rem); */
  box-shadow: 4px 4px 0 0 var(--color-dark-0);
  display: flex;
  align-items: start;
  gap: 16px;
  background-color: var(--color-light-0);
  position: relative;
  margin-bottom: 10px;
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

const Nickname = styled(Link)`
  font-weight: 500;
  font-size: var(--font-size-20);
  line-height: 29px;
`;

const DogName = styled(Link)`
  color: var(--color-primary);
  font-weight: 500;
  font-size: var(--font-size-13);
  line-height: 19px;
`;

const ContentStlye = css`
  flex: 1 1 0;
  align-self: center;
  font-weight: 500;
  font-size: var(--font-size-13);
  line-height: 30px;
`;

const Content = styled.div`
  ${ContentStlye}

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ContentEdit = styled.textarea`
  ${ContentStlye}
  border: var(--border);
  height: auto;
  padding: 6px;
  resize: none;
  line-height: 20px;
`;

const SeeMoreSvg = styled(IconSeeMore)`
  height: 24px;
  width: 24px;
  cursor: pointer;

  &:hover {
    color: var(--color-secondary);
  }
`;

const EditCancleSvg = styled(IconCancle)`
  height: 20px;
  width: 20px;

  :hover {
    color: var(--color-tertiary);
  }
`;

const EditCompleteSvg = styled(IconCheck)`
  height: 18px;
  width: 24px;

  :hover {
    color: var(--color-primary);
  }
`;

const EditMenu = styled(EditAndRemoveButton)`
  position: absolute;
  right: -9px;
  bottom: calc(50% - 80px);
  z-index: 999;
`;

const MenuButton = styled.button`
  align-self: center;
  ${FlexJustifyAlignCenter}
  position: relative;
  z-index: 999;

  ${SeeMoreSvg} {
    color: ${({ showSeeMoreMenu }) =>
      showSeeMoreMenu ? 'var(--color-secondary)' : 'inherit'};
  }
`;

const EditMenuWrapper = styled.div`
  width: 24px;
  height: 100%;
  ${FlexJustifyAlignCenter}
  align-self: center;
`;

function CommentsItem({
  commentId,
  commentContent,
  nickName,
  dogName,
  profileUrl,
  memberId,
  onDelete,
  onUpdate,
  displayEditMenu = false,
}) {
  const [editMode, setEditMode] = useState(false);
  const [showSeeMoreMenu, setShowSeeMoreMenu] = useState(false);
  const [newContent, setNewContent] = useState(commentContent);
  const [src, handleErrorImage] = useImageError(profileUrl);

  const { closeModal } = useModal();

  const handleSeeMoreButton = () => {
    setShowSeeMoreMenu(true);
  };

  const handleEditMenu = () => {
    setEditMode(true);
    setShowSeeMoreMenu(false);
  };

  const handleCompleteClick = () => {
    if (commentContent !== newContent) {
      onUpdate({ commentId, newContent });
    }

    setEditMode(false);
  };

  const handleDeleteClick = () => {
    onDelete({ commentId });
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setNewContent(commentContent);
  };

  const handleChange = event => {
    const content = event.target.value;

    setNewContent(content);
  };

  const handleOusideClick = () => {
    setShowSeeMoreMenu(false);
  };

  return (
    <StyledCommenstItem borderRadius="5px" tag="li" data-comment-id={commentId}>
      <Avatar
        src={src}
        onError={handleErrorImage}
        alt={`${nickName} 프로필 사진`}
      />
      <NameContainer>
        <Nickname to={`/user/${memberId}`} onClick={closeModal}>
          {nickName}
        </Nickname>
        <DogName to={`/user/${memberId}`} onClick={closeModal}>
          {dogName}
        </DogName>
      </NameContainer>
      {editMode ? (
        <Fragment>
          <ContentEdit
            value={newContent}
            name="newContent"
            onChange={handleChange}
            row={3}
          />
          <MenuButton onClick={handleCompleteClick}>
            <EditCompleteSvg />
          </MenuButton>
          <MenuButton onClick={handleCancelClick}>
            <EditCancleSvg />
          </MenuButton>
        </Fragment>
      ) : (
        <Fragment>
          <Content>{commentContent}</Content>
          <EditMenuWrapper>
            {displayEditMenu ? (
              <MenuButton
                showSeeMoreMenu={showSeeMoreMenu}
                onClick={handleSeeMoreButton}
              >
                <SeeMoreSvg />
              </MenuButton>
            ) : null}
          </EditMenuWrapper>
        </Fragment>
      )}

      {showSeeMoreMenu && (
        <EditMenu
          onOutsideClick={handleOusideClick}
          onEdit={handleEditMenu}
          onDelete={handleDeleteClick}
        />
      )}
    </StyledCommenstItem>
  );
}

export default CommentsItem;
