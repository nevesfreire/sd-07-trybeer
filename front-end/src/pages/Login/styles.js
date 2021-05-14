import styled from 'styled-components';

export const MainDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 5%;

  @media only screen and (max-width: 425px){
    margin-top: 30%;
    flex: 1;
    padding: 0;
    justify-content: center;
    height: 50%;
  }
    
`;

export const FormWrapper = styled.div`
  flex: 1;
  padding: 1.5em 0em;
  width: 50em;
  height: 15em;
  background-color: gray;
  border: solid 0.8px black;
  box-shadow: 3px 3px 3px darkgray;
  @media only screen and (max-width: 425px){
    display: flex;
    width: 20em;
    height: 1em;
    padding: 1em;

    input {
      width: 10em;
      font-size: 1em;
    }

    button { 
      font-size: 1em;
    }

    label {
      justify-self: flex-start;
    }
  }
`;

export const H1 = styled.h1`
  align-self: center;
  font-weight: bold;
  margin-bottom: 1.2em;
  font-size: 3em;
`;
