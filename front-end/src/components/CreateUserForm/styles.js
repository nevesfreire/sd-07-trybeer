import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  width: 100%;
`;

export const Input = styled.input`
  width: 40%;
  padding-top: 0.7em;
  padding-left: 0.4em;
  font-size: 1.2em;
  min-width: 360px;
  border: none;
  margin-bottom: 0.8em;
  border-bottom: solid 2px red;
  outline: none;
`;

export const Button = styled.button`
  font-size: 1.5em;
  font-weight: bolder;
  padding: 0;
  width: 15em;
  height: 3em;
  border-radius: 5px;
  margin-top: 0.2em;
  outline: none;
    &:hover {
      background-color: red;
      color: white;
    }
`;

export const Span = styled.span`
  justify-self: flex-start;
`;
