import styled from 'styled-components';

const Container = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  /* padding-top: 60px; */
  margin: 0;
  overflow: auto;

  .checkout-card-container {
    width: 90%;
    height: max-content;
    /* background-color: blue; */
    margin: 10px auto;
    display: flex;
    flex-flow: row wrap;
  }

  .checkout-total-price {
    background-color: black;
    color: white;
    font-weight: 900;
    font-size: 2rem;
    padding: 10px 0;
    margin: 0;
  }

  .checkout-form-container {
    background-color: white;
    display: flex;
    flex-flow: column nowrap;
  }

  .checkout-disable-button {
    margin: 0;
    padding: 20px;
    font-size: 2rem;
    font-weight: 900;
  }

  .checkout-final-button {
    margin: 0;
    padding: 20px;
    background-color: yellow;
    font-size: 2rem;
    font-weight: 900;
    width: 100%;
  }

  h3 {
    text-align: center;
  }

`;

export default Container;
