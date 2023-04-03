import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import variables from './variables';

const GlobalStyles = createGlobalStyle` 
  ${variables}
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    font-family: var(--font-main);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: var(--font-main);
    font-size: var(--font-size-16);
  }

  body {
    font-family: var(--font-main);
    color: var(--color-dark-0);
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

  /* Modalbase animation */
  @keyframes roadRunnerIn {
    0% {
      transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }
    70% {
      transform: translateX(50px) skewX(0deg) scaleX(0.9);
    }
    100% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
  }
  @keyframes roadRunnerOut {
    0% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
    30% {
      transform: translateX(-100px) skewX(-5deg) scaleX(0.9);
    }
    100% {
      transform: translateX(1500px) skewX(30deg) scaleX(1.3);
    }
  }

  /* Info page animation */
  @keyframes Loop {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-270%, 0, 0);
      transform: translate3d(-270%, 0, 0);
    }
  }
  @keyframes TextLoop {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
`;

export default GlobalStyles;
