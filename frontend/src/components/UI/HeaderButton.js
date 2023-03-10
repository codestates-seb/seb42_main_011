import styled, { css } from 'styled-components';

const VARIANTS = {
  login: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 150px;
    --btn-box-height: 69px;
    --btn-border-bottom: 1.5px solid var(--color-dark-0);
  `,
  logout: css`
    --btn-color: var(--color-dark-0);
    --btn-bg-color: var(--color-light-0);
    --btn-hover-bg-color: var(--color-tertiary);
    --btn-box-width: 150px;
    --btn-box-height: 69px;
    --btn-box-radius: 0 10px 0 0;
    --btn-border-left: 1.5px solid var(--color-dark-0);
    --btn-border-bottom: 1.5px solid var(--color-dark-0);
  `,
  mypage: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 150px;
    --btn-box-height: 69px;
    --btn-border-bottom: 1.5px solid var(--color-dark-0);
  `,
  write: css`
    --btn-color: var(--color-dark-0);
    --btn-bg-color: var(--color-light-0);
    --btn-hover-bg-color: var(--color-primary);
    --btn-box-width: 150px;
    --btn-box-height: 69px;
    --btn-border-left: 1.5px solid var(--color-dark-0);
    --btn-border-bottom: 1.5px solid var(--color-dark-0);
  `,
};

const StyledButton = styled.button`
  ${({ variant }) => VARIANTS[variant]}

  font-size: 16px;
  font-weight: 500;
  width: var(--btn-box-width);
  height: var(--btn-box-height);
  color: var(--btn-color);
  background-color: var(--btn-bg-color);
  border-left: var(--btn-border-left);
  border-bottom: var(--btn-border-bottom);
  border-radius: var(--btn-box-radius);

  &:hover {
    color: var(--color-light-0);
    background-color: var(--btn-hover-bg-color);
    border: var(--btn-border);
    border-left: var(--btn-border-left);
    border-bottom: var(--btn-border-bottom);
  }
`;

function HeaderButton({ variant = 'write', tag = 'button', children }) {
  return (
    <StyledButton variant={variant} as={tag}>
      {children}
    </StyledButton>
  );
}

export default HeaderButton;
