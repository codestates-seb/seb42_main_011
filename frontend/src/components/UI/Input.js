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

  width: var(--input-box-width);
  height: 50px;
  border: 1.5px solid #000;
  border-radius: 5px;
  background-color: var(--color-light-1);
  text-indent: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

function Input({ variant = 'edit', id, label, type = 'text' }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} type={type} variant={variant} />
    </div>
  );
}
export default Input;