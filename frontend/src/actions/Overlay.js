/**
 * @author Anthony Altieri on 6/4/17.
 */

export const showOverlay = (mode) => ({
  type: 'SHOW_OVERLAY',
  mode,
});

export const hideOverlay = () => ({
  type: 'HIDE_OVERLAY',
});
