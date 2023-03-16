import styled, { css } from 'styled-components';

const VARIANTS = {
  regular: css`
    --input-box-width: 400px;
    --input-short-width: 280px;
    --input-long-width: 400px;
  `,
  large: css`
    --input-box-width: 100%;
    --input-short-width: 100%;
    --input-long-width: 480px;
  `,
};

const StyledInput = styled.input`
  ${({ variant }) => VARIANTS[variant]}
  width: var(--input-box-width);
  @media screen and (min-height: 1050px){
    height: 50px;
  }
  @media screen and (min-width: 1174px){
    width: var(--input-long-width);
  }
  @media screen and (max-width: 625px) {
    width: var(--input-short-width);
  }
  min-height: 40px;
  border: var(--border);
  border-radius: 5px;
  background-color: var(--color-light-1);
  text-indent: 10px;
  flex-grow: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

function Input({ variant = 'edit', id, label, type = 'text', ...props }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} type={type} variant={variant} {...props} />
    </div>
  );
}
export default Input;
