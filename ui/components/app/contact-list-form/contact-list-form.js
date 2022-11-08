import React from 'react';
import {
  BORDER_RADIUS,
  COLORS,
} from '../../../helpers/constants/design-system';
import Box from '../../ui/box';
/**
 * Build a `ContactListForm` component
 *
 * INSTRUCTIONS
 *
 * The Figma file can be found here: https://www.figma.com/file/P0aTUhvddQjLroRkqGlaBh/Dev-User-Test?node-id=0%3A1
 * All components that you will need are in the `ui/components/component-library` folder with the exception of the form wrapper.
 *
 *
 */

const ContactListForm = () => (
  <Box
    borderRadius={BORDER_RADIUS.LG}
    backgroundColor={COLORS.BACKGROUND_DEFAULT}
    borderColor={COLORS.BORDER_DEFAULT}
    padding={4}
  >
    Contact List Form
  </Box>
);

export default ContactListForm;
