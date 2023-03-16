import styled, { css } from 'styled-components';

const VARIANTS = {
  regular: css`
    --input-box-width: 400px;
  `,
  large: css`
    --input-box-width: 605px;
  `,
};

const StyledInput = styled.input`
  ${({ variant }) => VARIANTS[variant]}
  /* width: var(--input-box-width); */
  width: 100%;
  @media screen and (min-height: 1050px){
    height: 50px;
  }
  @media screen and (min-width: 1174px){
    width: 480px;
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
