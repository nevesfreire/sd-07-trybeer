import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #666;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 370px;
  margin: 10px;
  position: relative;
  width: 270px;

  .image {
    height: 140px;
    margin: 20px 0;
    width: auto;
  }

  .quantity-box {
    align-content: center;
    align-items: baseline;
    bottom: 30px;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: space-evenly;
    line-height: 44px;
    position: absolute;
    width: 100%;
  }

  .quantity-btn {
    outline: none;
  }

  .quantity-text {
    font-size: 40px;
    margin: auto 0;
  }

  .product-name {
    font-family: 'Acumin Variable Concept';
    margin: 0;
    padding: 0 15px;
    text-align: center;
  }

  .product-price {
    bottom: 60px;
    font-family: 'Old Standard TT';
    font-size: 30px;
    position: absolute;
    text-align: center;
  }

  h3 {
    cursor: pointer;
    display: flex;
    font-size: 50px;
    font-weight: 100;
    margin: 0;
    padding: 0;
    user-select: none;
  }

  @media (max-width: 500px) {

  }
`;

export default Container;
