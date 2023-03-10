import styled, { css } from 'styled-components';

const VARIANTS = {
  inputbtn: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 200px;
    --btn-box-height: 40px;
  `,
  edit: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-tertiary);
    --btn-hover-bg-color: var(--color-tertiary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  follow: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-secondary);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  unfollow: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-tertiary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  finish: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-primary);
    --btn-hover-bg-color: var(--color-primary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  upload: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-primary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  cancel: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
  `,
  location: css`
    --btn-color: var(--color-light-0);
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 107px;
    --btn-box-height: 36px;
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
  border: 1.5px solid var(--color-dark-0);
  border-radius: 5px;
  transition: all 140ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    color: var(--color-light-0);
    background-color: var(--btn-hover-bg-color);
    border: 1.5px solid var(--color-dark-0);
    box-shadow: 3px 3px 0 0 var(--color-dark-0);
    -webkit-transform: translate(-0.25rem, -0.25rem);
    -ms-transform: translate(-0.25rem, -0.25rem);
    transform: translate(-0.25rem, -0.25rem);
  }
`;

function Button({ variant = 'edit', tag = 'button', children }) {
  return (
    <StyledButton variant={variant} as={tag}>
      {children}
    </StyledButton>
  );
}

export default Button;
