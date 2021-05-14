import styled from 'styled-components';

const Container = styled.div`

.page-body {
  align-items: center;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  width: 100vw;
}

.cards-container {
  align-items: center;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  width: 90vw;
}

.grid {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, auto));
  justify-content: space-evenly;
  margin: auto;
  overflow: auto;
  padding-top: 60px;
  width: 100%;
}

.total-btn {
  bottom: 0;
  position: fixed;
}

@media (orientation: portrait), (max-width: 500px) {
  .grid {
    padding-top: 80px;
  }
}

`;

export default Container;
