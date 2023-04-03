import styled, { css } from 'styled-components';

const baseStyles = css`
  font-weight: 500;
  transition: all 140ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --btn-box-width: 150px;
  --btn-box-height: 69px;
  --btn-color: var(--color-dark-0);
  --btn-bg-color: var(--color-light-0);
`;

const VARIANTS = {
  small: css`
    ${baseStyles}
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 107px;
    --btn-box-height: 36px;
    --btn-box-border: var(--border);
    --btn-box-border-radius: 5px;
    --btn-box-shadow: 3px 3px 0 0 var(--color-dark-0);
    --btn-hover-translate: translate(-0.25rem, -0.25rem);
  `,
  medium: css`
    ${baseStyles}
    --btn-bg-color: var(--color-tertiary);
    --btn-hover-bg-color: var(--color-tertiary);
    --btn-box-width: 135px;
    --btn-box-height: 45px;
    --btn-box-border: var(--border);
    --btn-box-border-radius: 5px;
    --btn-box-shadow: 3px 3px 0 0 var(--color-dark-0);
    --btn-hover-translate: translate(-0.25rem, -0.25rem);
  `,
  large: css`
    ${baseStyles}
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 200px;
    --btn-box-height: 40px;
    --btn-box-border: var(--border);
    --btn-box-border-radius: 5px;
    --btn-box-shadow: 3px 3px 0 0 var(--color-dark-0);
    --btn-hover-translate: translate(-0.25rem, -0.25rem);
  `,
  headerprimary: css`
    ${baseStyles}
    --btn-bg-color: var(--color-dark-0);
    --btn-hover-bg-color: var(--color-secondary);
    --btn-box-width: 150px;
    --btn-box-height: 70px;
    --btn-border-bottom: var(--border);
    --btn-border-left: var(--border);
  `,
  headersecondary: css`
    ${baseStyles}
    --btn-color: var(--color-dark-0);
    --btn-bg-color: var(--color-light-0);
    --btn-hover-bg-color: var(--color-tertiary);
    --btn-box-width: 150px;
    --btn-box-height: 70px;
    --btn-box-border-radius: 0 10px 0 0;
    --btn-border-left: var(--border);
    --btn-border-bottom: var(--border);
  `,
  headertertiary: css`
    ${baseStyles}
    --btn-color: var(--color-dark-0);
    --btn-bg-color: var(--color-light-0);
    --btn-hover-bg-color: var(--color-primary);
    --btn-box-width: 150px;
    --btn-box-height: 70px;
    --btn-border-left: var(--border);
    --btn-border-bottom: var(--border);
  `,
};

const StyledButton = styled.button`
  ${({ variant }) => VARIANTS[variant]}

  font-weight: 500;
  width: var(--btn-box-width);
  height: var(--btn-box-height);
  color: var(--color-light-0);
  background-color: var(--btn-bg-color);
  border: var(--btn-box-border);
  border-radius: var(--btn-box-border-radius);
  transition: all 140ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    color: var(--color-light-0);
    background-color: var(--btn-hover-bg-color);
    border: var(--btn-box-border);
    box-shadow: var(--btn-box-shadow);
    -webkit-transform: var(--btn-hover-translate, none);
    -ms-transform: var(--btn-hover-translate, none);
    transform: var(--btn-hover-translate, none);
  }
`;

function Button({ variant = 'small', tag = 'button', children, ...rest }) {
  return (
    <StyledButton variant={variant} as={tag} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
