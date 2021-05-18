import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .order-card {
    background-color: white;
    width: 80%;
    display: flex;
    justify-content: space-around;
    color: #110905;
    text-decoration: none;
  }

  .order-card:first-child {
    margin-top: 20px;
  }

  .details-card {
    background-color: white;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    color: black;
    width: 90%;
  }

  .top-details {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    font-weight: 800;
    text-transform: uppercase;
  }

  .middle-details {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      justify-content: space-around;
    }
  }

  .bottom-details {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

export default MainContainer;
