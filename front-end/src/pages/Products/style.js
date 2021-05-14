import styled from 'styled-components';

const Container = styled.div`

.page-body {
  align-items: center;
  background-color: white;
  background-image: linear-gradient(#191919, #000);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  width: 100vw;
}

.cards-container {
  align-items: center;
  background-color: #444;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: auto;
  padding: 90px 30px;
  width: 90vw;
}

.grid {
  align-items: center;
  display: grid;
  flex-direction: unset;
  grid-template-columns: repeat(auto-fit, minmax(250px, auto));
  margin: auto;
  padding: 60px 0;
  width: 100%;
}

.total-btn {
  bottom: 0;
  position: fixed;
}

`;

export default Container;
