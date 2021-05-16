import styled from 'styled-components';

const Container = styled.div`

display: flex;
flex-flow: column nowrap;
justify-content: space-between;
height: 100vh;
width: 100%;
background-color: #FAC62A;

// .page-body {
// align-items: center;
// display: flex;
// flex-flow: column nowrap;
// justify-content: space-between;
// height: 100vh;
// width: 100%;
// overflow-x: hidden;
// }

// .cards-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   // align-items: center;
//   // background-color: #eee;
//   // height: 100%;
//   // margin: 0 auto;
//   width: 100%;
//   padding: 0;
// }

.grid {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, auto));
  justify-content: space-evenly;
  margin: auto;
  // padding-top: 60px;
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
}

.total-btn {
  width: 100%;
  margin: 0;
  padding: 20px;
  font-size: large;
  background-color: #252525;
  color: white;
  // position: fixed;
}

@media (orientation: portrait), (max-width: 500px) {
  .grid {
    // padding-top: 80px;
  }
}

`;

export default Container;
