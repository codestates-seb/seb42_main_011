import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import variables from './variables';

const GlobalStyles = createGlobalStyle` 
  ${variables}
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    font-family: $font-main;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: $font-main;
    font-size: $font-size-16;
  }

  body {
    font-family: $font-main;
    color: $primary;
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }
`;

export default GlobalStyles;