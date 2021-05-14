import styled from 'styled-components';

const Container = styled.div`

.header {
  background-color: #191919;
  color: white;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  // position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.header-title {
  font-size: 2.5vh;
  margin: auto 0;
  padding: 10px 10px;
}

.header-title-trybeer {
  font-family: 'LuloCleanW01-OneBold', monospace;
  font-weight: 700;
}

h1, h3 {
  cursor: pointer;
  display: flex;
  margin: 0;
}

.side-menu-container {
  display: flex;
  justify-content: space-around;
}

.nav-item, .logoff-button {
  cursor: pointer;
  font-family: 'Acumin Variable Concept';
  font-size: 2.5vh;
  font-weight: lighter;
  margin: auto 30px;
}

.nav-close, .menu-button {
  padding: 5px 25px;
}

.menu-button, .nav-close, .nav-complement {
  visibility: hidden;
}

@media (orientation:portrait), (max-width: 500px){
  .header {
    position: fixed;
  }

  .header-title {
    font-size: 30px;
    margin: auto;
  }
  
  .side-menu-container {
    background-color: rgb(25, 25, 25);
    box-shadow: -1px -1px 15px #222;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    margin: 0;
    outline: none;
    position: fixed;
    right: -100%;
    top: 0;
    transition: all 0.5s ease;
    width: 75%;
    z-index: 2;
  }

  .nav-complement {
    background-color: black;
    display: block;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    transition: opacity 0.5s;
    width: 100%;
    z-index: 1;
  }

  @keyframes fadeIn {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }

  @keyframes fadeOut {
    from {
      visibility: visible;
    }
    to {
      visibility: hidden;
    }
  }

  .nav-complement-hide {
    animation: 0.5s fadeOut;
    animation-fill-mode: forwards;
  }

  .nav-complement-show {
    animation: 0.5s fadeIn;
    animation-fill-mode: forwards;
    opacity: 0.5;
  }

  .show-menu {
    right: 0;
  }

  .nav-close {
    align-content: center;
    display: flex;
    flex-direction: row;
    font-size: 30px;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding: 10px 30px;
    text-align: right;
  }

  .nav-item, .logoff-button {
    font-size: 5vh;
    margin: 20px 25px;
    text-align: left;
  }

  .logoff-button {
    bottom: 10vh;
    position: absolute;
  }

  .menu-button {
    cursor: pointer;
    display: block;
    font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
    font-size: 37px;
    margin: auto 0;
    padding: 0px 0px;
    text-align: right;
    transform: translateX(12%);
  }

  .menu-button, .nav-close {
    visibility: visible;
  }
}

`;

export default Container;
