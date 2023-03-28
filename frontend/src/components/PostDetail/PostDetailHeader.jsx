import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconCheck } from '../../assets/icons/icon-check.svg';
import { ReactComponent as IconSeeMore } from '../../assets/icons/icon-see-more-small.svg';
import { ReactComponent as IconCancle } from '../../assets/icons/icon-cancle.svg';
import EditAndRemoveButton from '../UI/EditAndRemoveButton';

const Header = styled.section`
  position: absolute;
  width: calc(50% - 18px);
  right: 0;
  top: 0;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;

  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;

  background: #ffb562;
  border-width: 0 0 1.5px 1.5px;
  border-style: solid;
  border-color: #000000;
  border-radius: 0px 10px 0px 0px;
`;

const Title = styled.h3`
  flex: 1 1 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CompleteIcon = styled(IconCheck)`
  height: 20px;
  width: 32px;
`;

const CloseIcon = styled(IconCancle)`
  height: 20px;
  width: 20px;
`;

const SeeMoreIcon = styled(IconSeeMore)`
  height: 20px;
  width: 32px;
`;

const EditMenu = styled(EditAndRemoveButton)`
  position: absolute;
  right: 50px;
  bottom: -40px;
  z-index: 999;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  ${CompleteIcon} {
    color: var(--color-dark-0);

    :hover {
      color: var(--color-primary);
    }
  }

  ${CloseIcon} {
    color: var(--color-dark-0);

    :hover {
      color: var(--color-tertiary);
    }
  }

  ${SeeMoreIcon} {
    color: var(--color-dark-0);

    :hover {
      color: var(--color-primary);
    }
  }

  &:disabled {
    cursor: default;

    ${CompleteIcon} {
      color: inherit;
    }
  }
`;

function PostDetailContentsHeader({
  createdAt,
  dogName,
  disabledSubmit = false,
  onClose,
  onSubmit,
  onDelete,
  onEdit,
  menuButtonType = 'new',
}) {
  const displayDate = new Date(createdAt).toISOString().split('T')[0];
  const displayTitleText = `${displayDate} ${dogName}의 일기`;
  const [showSeeMoreMenu, setShowSeeMoreMenu] = useState(false);

  const handleOusideClick = () => {
    setShowSeeMoreMenu(false);
  };

  const handleSeeMoreButtonClick = () => {
    setShowSeeMoreMenu(true);
  };

  return (
    <Header>
      <Title>{displayTitleText}</Title>
      <ButtonContainer>
        {
          {
            none: null,
            edit: (
              <MenuButton type="button" onClick={handleSeeMoreButtonClick}>
                <SeeMoreIcon />
                {showSeeMoreMenu && (
                  <EditMenu
                    onOutsideClick={handleOusideClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )}
              </MenuButton>
            ),
            new: (
              <MenuButton
                type="button"
                onClick={onSubmit}
                disabled={disabledSubmit}
              >
                <CompleteIcon />
              </MenuButton>
            ),
          }[menuButtonType]
        }

        <MenuButton type="button" onClick={onClose}>
          <CloseIcon />
        </MenuButton>
      </ButtonContainer>
    </Header>
  );
}

export default PostDetailContentsHeader;
