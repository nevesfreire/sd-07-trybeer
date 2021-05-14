import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  margin: 10px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px black;
  width: 100%;
  height: 150px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  p {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  h2 {
    text-align: center;
    margin: 0;
    padding: 0;
  }

  button {
    font-weight: 900;
    padding: 10px 15px;
  }

  button:hover {
    background-color: yellow;
  }
`;

export default Container;
