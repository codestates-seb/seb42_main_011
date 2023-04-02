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

export const ScrollNone = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const FlexJustifyAlignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupScale = css`
  @media screen and (max-width: 1363px), (max-height: 900px) {
    scale: calc(0.9);
  }

  @media (max-width: 1024px), (max-height: 800px) {
    scale: calc(0.8);
  }

  @media (max-width: 765px) {
    scale: calc(0.7);
  }
`;
