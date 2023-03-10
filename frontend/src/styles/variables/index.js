import { css } from 'styled-components';
import color from './color';
import typography from './typography';

const variables = css`
  :root {
    ${color}
    ${typography}
  }
`;

export default variables;
