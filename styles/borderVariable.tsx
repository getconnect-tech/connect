import { css } from 'styled-components';
import { colors } from './colors';

export const Borders = {
  border_primary: css`
    border: 1px solid ${colors.border_brand};
    /* Border properties for retina displays */
    @media (-webkit-min-device-pixel-ratio: 2) {
      border: 0.5px solid ${colors.border_brand};
    }
  `,
  border_secondary: css`
    border: 1px solid ${colors.border_input_border};
    /* Border properties for retina displays */
    @media (-webkit-min-device-pixel-ratio: 2) {
      border: 0.5px solid ${colors.border_input_border};
    }
  `,
  border_delete: css`
    border: 1px solid ${colors.fill_danger};
    /* Border properties for retina displays */
    @media (-webkit-min-device-pixel-ratio: 2) {
      border: 0.5px solid ${colors.fill_danger};
    }
  `,
  border_disable: css`
    border: 1px solid ${colors.border_disabled};
    /* Border properties for retina displays */
    @media (-webkit-min-device-pixel-ratio: 2) {
      border: 0.5px solid ${colors.border_disabled};
    }
  `,
};
