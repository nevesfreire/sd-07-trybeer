import { createGlobalStyle } from 'styled-components';
import Jomhuria from '../src/assets/fonts/Jomhuria/Jomhuria-Regular.ttf';
import RobotoMono from '../src/assets/fonts/Roboto_Mono/static/RobotoMono-Light.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jomhuria';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${Jomhuria}) format('ttf');
  }

  @font-face {
    font-family: 'Roboto Mono';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(${RobotoMono}) format('ttf');
  }

  body {
    font-family: 'Roboto Mono', monospace; 
    margin: 0;
    padding: 0;
    font-size: 1rem;
    width: 100%;
    height: 100vh;
    background: #ffa700;

    @media only screen and (max-width: 425px){
    position: fixed;
  }
  }
  
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }

  

`;



export default GlobalStyle;
