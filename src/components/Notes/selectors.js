import { createSelector } from 'reselect';

export const selectStyle = createSelector(
  ({ style }) => style,
  ({ width }) => width,
  ({ height }) => height,
  (style, width, height) => ({
    ...style,
    width,
    height,
  })
);