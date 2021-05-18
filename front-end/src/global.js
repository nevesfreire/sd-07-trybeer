import { createGlobalStyle } from 'styled-components';

// #110905 - PRETO
// #1A1B1D - CINZA ESCURO
// #4B4648 - CINZA CLARO
// #C38E00 - AMARELO
// #D5BC69 - "ROSINHA"

const GlobalStyle = createGlobalStyle`
 body {
    background: ${({ theme }) => theme.amareloClaro};
    color: ${({ theme }) => theme.laranja};
    height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  button {
    cursor: pointer;
  }
  `;

export default GlobalStyle;
