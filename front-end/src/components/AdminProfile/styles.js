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
  border-bottom: solid 2px #f0be00;
  outline: none;
  -webkit-transition: border-bottom 3s ease-out;
  -moz-transition: border-bottom 3s ease-out;
  -o-transition: border-bottom 3s ease-out;
  transition: border-bottom 3s ease-out;
  &:hover {
    border-bottom: solid 2px #006600;
    cursor: pointer;
  }
`;

export const Span = styled.span`
  justify-self: flex-start;
`;
