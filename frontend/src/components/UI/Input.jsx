import React from 'react';
import { Fade } from 'react-reveal';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  width: var(--input-box-width);
  @media screen and (min-width: 1174px) {
    width: var(--input-long-width);
  }
  @media screen and (max-width: 625px) {
    width: var(--input-short-width);
  }
`;

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
  @media screen and (min-height: 1050px) {
    height: 50px;
  }
  @media screen and (min-width: 1174px) {
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

const ErrorMessage = styled.p`
  color: var(--color-tertiary);
  font-size: 0.867rem;
  padding-left: 2px;
  padding-top: 5px;
  word-wrap: break-word;
  margin-top: 5px;

  ${({ variant }) => VARIANTS[variant]}
  width: var(--input-box-width);
  @media screen and (min-width: 1174px) {
    width: var(--input-long-width);
  }
  @media screen and (max-width: 625px) {
    width: var(--input-short-width);
  }
`;

function Input({
  children,
  variant = 'edit',
  id,
  label,
  type = 'text',
  isFade = false,
  ...props
}) {
  let errorMessages = children;
  if (isFade) {
    errorMessages = children.filter(el => !!el);
  }
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} type={type} variant={variant} {...props} />

      {isFade && errorMessages.length > 0 && (
        <React.Fragment>
          {React.Children.map(errorMessages, (el, idx) => (
            <Fade bottom key={idx}>
              <ErrorMessage variant={variant}>{el}</ErrorMessage>
            </Fade>
          ))}
        </React.Fragment>
      )}
    </InputContainer>
  );
}
export default Input;
