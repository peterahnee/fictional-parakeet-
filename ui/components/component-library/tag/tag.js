import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '../../ui/box/box';
import { Text } from '../text';
import {
  AlignItems,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  BorderRadius,
  DISPLAY,
  JustifyContent,
  TextType,
} from '../../../helpers/constants/design-system';

export const Tag = ({ label, className, labelProps, ...props }) => {
  return (
    <Box
      className={classnames('mm-tag', className)}
      backgroundColor={BACKGROUND_COLORS.backgroundDefault}
      borderColor={BORDER_COLORS.borderDefault}
      borderWidth={1}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
      paddingLeft={1}
      paddingRight={1}
      borderRadius={BorderRadius.pill}
      display={DISPLAY.INLINE_BLOCK}
      {...props}
    >
      <Text variant={TextType.bodySm} {...labelProps}>
        {label}
      </Text>
    </Box>
  );
};

Tag.propTypes = {
  /**
   * The text content of the Tag component
   */
  label: PropTypes.string,
  /**
   * The label props of the component. Most Text component props can be used
   */
  labelProps: PropTypes.shape(Text.PropTypes),
  /**
   * Additional classNames to be added to the Tag component
   */
  className: PropTypes.string,
  /**
   * Tag also accepts all props from Box
   */
  ...Box.propTypes,
};
