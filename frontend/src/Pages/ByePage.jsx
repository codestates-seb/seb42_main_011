import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';


const FormContainer = styled.section`
  display: grid;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* min-width: 500px; */
  /* min-height: 594px; */
  height: calc(100vh - 300px);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 100px;
  /* margin-top: 70px; */
  /* flex-grow: 1; */
  /* justify-self: flex-start; */
  align-self: flex-end;
`;

const ButtonContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */
  /* flex-grow: 1; */
`;

function ByePage() {
  return (
    <FormContainer>
      <Title>그동안 이용해주셔서 감사합니다.</Title>
      <ButtonContainer>
        <Link to="/"><Button variant='large'>홈으로 돌아가기</Button></Link>
      </ButtonContainer>
    </FormContainer>
  )
};

export default ByePage;
