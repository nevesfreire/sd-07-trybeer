import styled from 'styled-components';

const PageContainer = styled.main`
  display: flex;
  height: 100vh;
`;

const MainComponentContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: ${({ cartItemsComponent }) => cartItemsComponent ? '100%' : '73%'};
  align-items: center;
  gap: 1rem;

  table {
    width: 95%;
    height: 80%;
    margin: auto;
    padding-bottom: 20px;

    thead {
      text-transform: uppercase;
    }

    th, td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgb(61, 19, 1);
    }

    th {
      font: 500 1rem Lexend,sans-serif;
      text-align: left;
    }
  }

  ul {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  li {
    color: rgb(61, 19, 1);
    background: rgb(245, 187, 15);
    padding: 1.25rem;
    border-radius: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
  }

  li:last-child {
    justify-content: flex-end;
  }

  .pendingOrder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 1rem;
    width: 25rem;
    height: 10rem;
    flex-wrap: inherit;
    background-color: white;
    border-radius: 2.5%;
    border: 3px solid #3d1301;
    
    &:hover {
      filter: brightness(0.90)
    }

    a {
      text-decoration: none;
      color: black;
      
      &:hover {
        text-decoration: underline;
      }
    }

    span {
      margin: auto;
      padding: 1rem;
    }
  }

  /* button {
    background-color: ${({ theme }) => theme.amarelo};
    border: none;
    border-radius: 25%;
    margin-left: 1rem;
  } */

  .cartItems {
    margin: 1rem;

    div {
      display:inline-block;
      margin-left: 1rem;
    }
  }
`;

const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .datas-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 22%;
    }
  }
`;

export { PageContainer, MainComponentContainer, ProfileContainer };
