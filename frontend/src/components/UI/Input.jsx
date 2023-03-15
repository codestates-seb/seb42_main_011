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
  /* height: 50px; */
  border: var(--border);
  border-radius: 5px;
  background-color: var(--color-light-1);
  text-indent: 10px;
  flex-grow: ${props => props.flexGrow};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

function Input({ variant = 'regular', id, label, type = 'text', flexGrow }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} type={type} variant={variant} flexGrow={flexGrow} />
    </div>
  );
}
export default Input;
