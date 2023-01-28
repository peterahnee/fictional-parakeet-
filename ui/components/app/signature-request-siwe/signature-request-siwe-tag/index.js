import React from 'react';
import PropTypes from 'prop-types';
import {
  TypographyType,
  Size,
  DISPLAY,
  AlignItems,
  FONT_WEIGHT,
  BACKGROUND_COLORS,
  TEXT_COLORS,
} from '../../../../helpers/constants/design-system';
import Box from '../../../ui/box';
import Typography from '../../../ui/typography/typography';

const SignatureRequestSIWETag = ({ text }) => {
  return (
    <Box
      className="signature-request-siwe-tag"
      marginRight={1}
      display={DISPLAY.INLINE_FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.errorDefault}
      borderRadius={Size.XL}
      paddingLeft={4}
      paddingRight={4}
    >
      <Typography
        fontWeight={FONT_WEIGHT.BOLD}
        margin={0}
        variant={TypographyType.H7}
        color={TEXT_COLORS.errorInverse}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default SignatureRequestSIWETag;

SignatureRequestSIWETag.propTypes = {
  /**
   * The text to display in the tag
   */
  text: PropTypes.string,
};
