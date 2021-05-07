import styled from 'styled-components';

export const Header = styled.div`
  background-color: rgb(25, 25, 25);
  color: white;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;

  .header-title {
    margin: auto 0;
    padding: 20px 20px;
  }

  .nav-container {
    display: flex;
    justify-content: space-around;
  }

  .nav-item, .logoff-button {
    margin: auto 30px;
  }

  .nav-close, .menu-button {
    padding: 5px 25px;
  }

  @media only screen and (max-width: 1080px){
    .nav-container {
      background-color: rgb(25, 25, 25);
      box-shadow: -1px -1px 12px #222;
      display: block;
      height: 100%;
      margin: 0;
      position: fixed;
      right: 0;
      top: 0;
      width: 60%;
    }
  
    .nav-close {
      display: block;
      font-size: 20px;
      text-align: right;
    }
  }
`;
