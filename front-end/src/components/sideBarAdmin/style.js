import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 2%;
  flex-direction: column;
  align-content: center;
  background-color: #3700B3;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-size: 33pt;
  color: #DDDDE4;
  margin: 5%;
`;

export const Button = styled.button`
  background: black;
  border-radius: 3px;
  border: 1px solid #fff;
  color: #fff;
  margin: 2%;
  padding: 2%;
  width: 100%;
`;

export const WrapperButtons = styled.div`
  display: flex;
  margin-bottom: 70%;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const ButtonLeave = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-end;
  justify-content: center;
`;
