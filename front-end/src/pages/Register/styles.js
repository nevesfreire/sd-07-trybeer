import styled from 'styled-components';

export const MainDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
`;

export const FormWrapper = styled.div`
  flex: 1;
  padding: 1.5em 0em;
  width: 100%;
  height: 15em;
  background-color: gray;
  border: solid 0.8px black;
  box-shadow: 3px 3px 3px darkgray;
`;

export const H1 = styled.div`
  align-self: center;
  font-weight: bold;
  margin-bottom: 1.2em;
  font-size: 3em;
`;
