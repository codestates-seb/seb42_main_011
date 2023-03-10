import { css } from 'styled-components';

const color = css`
  --black: #000;
  --black-light-1: #181818;
  --white: #ffffff;
  --white-darker-1: #f5f5f5;
  --white-darker-2: #f9f2ed;
  --orange: #ffb562;
  --blue: #3ab0ff;
  --red: #f87474;
  --gray: #eeeeee;
  --gray-darker-1: #d9d9d9;

  --color-primary: var(--blue);
  --color-secondary: var(--orange);
  --color-tertiary: var(--red);
  --color-dark-0: var(--black);
  --color-dark-1: var(--black-light-1);
  --color-dark-2: var(--gray-darker-1);
  --color-dark-3: var(--gray);
  --color-light-0: var(--white);
  --color-light-1: var(--white-darker-1);
  --color-light-2: var(--white-darker-2);
`;

export default color;
