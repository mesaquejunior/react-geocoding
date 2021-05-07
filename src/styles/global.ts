import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f0f2f5;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Roboto", sans-serif;
    color: #3a3a3a;
  }

  button {
    cursor: pointer;
  }
`;
