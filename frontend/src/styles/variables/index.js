import { css } from 'styled-components';
import color from './color';
import typography from './typography';

const variables = css`
  :root {
    ${color}
    ${typography}
    --border: 1.5px solid var(--color-dark-0);
  }
`;

export default variables;
