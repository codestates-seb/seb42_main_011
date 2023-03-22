import { css } from 'styled-components';

export const FONT_SIZE = {
  xs: css`
    font-size: var(--font-size-10);
    line-height: var(--line-height-10);
  `,
  sm: css`
    font-size: var(--font-size-13);
    line-height: var(--line-height-13);
  `,
  md: css`
    font-size: var(--font-size-16);
    line-height: var(--line-height-16);
  `,
  lg: css`
    font-size: var(--font-size-20);
    line-height: var(--line-height-20);
  `,
};

export const StyleScrollNone = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
