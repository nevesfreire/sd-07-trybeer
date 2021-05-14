import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #666;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 270px;

  .image {
    margin: auto 0;
  }

  .quantity-box {
    display: flex;
    flex-direction: row;
  }

  button {
    padding: 5px 5px;
  }

  @media (max-width: 500px) {

  }
`;

export default Container;
