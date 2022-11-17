import React from 'react';
import Typography from '../../ui/typography';
import {
  BORDER_RADIUS,
  COLORS,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
  SIZES,
} from '../../../helpers/constants/design-system';
import Box from '../../ui/box';
import { AvatarAccount } from '../../component-library/avatar-account';
import { TYPES } from '../../component-library/avatar-account/avatar-account.constants';
import { TextField } from '../../component-library/text-field';
import {
  Icon,
  ICON_NAMES,
  ButtonPrimary,
  ButtonSecondary,
} from '../../component-library';

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
    justifyContent={JUSTIFY_CONTENT.CENTER}
    flexDirection={FLEX_DIRECTION.COLUMN}

  >
    <Typography>Contact List Form</Typography>
    <AvatarAccount address={'test'} type={TYPES.JAZZICON} />
    <TextField placeholder={'Enter username'} />
    <TextField
      leftAccessory={<Icon name={ICON_NAMES.SEARCH_FILLED} />}
      placeholder={'Search, public address (0x), or ENS'}
      size={SIZES.LG}
    />
    <ButtonSecondary>Cancel</ButtonSecondary>
    <ButtonPrimary>Save</ButtonPrimary>
  </Box>
);

export default ContactListForm;
