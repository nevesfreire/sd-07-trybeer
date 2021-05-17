import styled from 'styled-components';

const CardContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 80vh;
  width: 90vw;
  margin: 15px auto;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  gap: 10px;
  text-align: center;

  .card {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: 5px;
  }

  .quantity-buttons {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .thumb {
    width: 100px;
  }
`;

export default CardContainer;
