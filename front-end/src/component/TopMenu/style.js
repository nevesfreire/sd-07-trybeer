import styled from 'styled-components';

const Container = styled.div`

.header {
  background-color: rgb(25, 25, 25);
  color: white;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  // position: fixed;
  top: 0;
  width: 100%;
}

.header-title {
  margin: auto 0;
  padding: 10px 10px;
}

.header-title-trybeer {
  font-family: 'LuloCleanW01-OneBold', monospace;
  font-weight: 700;
}

h1, h3 {
  margin: 0;
}

.side-menu-container {
  display: flex;
  justify-content: space-around;
}

.nav-item, .logoff-button {
  cursor: pointer;
  font-family: 'Acumin Variable Concept';
  margin: auto 30px;
}

.nav-close, .menu-button {
  padding: 5px 25px;
}

.menu-button, .nav-close, .nav-complement {
  visibility: visible;
}

@media (orientation:portrait), (max-width: 500px){
  .header-title {
    font-size: 30px;
    margin: auto;
  }
  
  .side-menu-container {
    background-color: rgb(25, 25, 25);
    box-shadow: -1px -1px 15px #222;
    display: block;
    height: 100%;
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
    display: block;
    font-size: 30px;
    margin-bottom: 20px;
    padding: 10px 30px;
    text-align: right;
  }

  .nav-item, .logoff-button {
    font-size: 30px;
    margin: 20px 25px;
    text-align: left;
  }

  .logoff-button {
    margin-bottom: 50px;
    margin-top: 80%;
  }

  .menu-button {
    display: block;
    font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
    font-size: 37px;
    margin: auto 0;
    padding: 0px 0px;
    text-align: right;
    transform: translateX(12%);
  }

  .menu-button, .nav-close {
    cursor: pointer;
    visibility: visible;
  }
}

`;

export default Container;
