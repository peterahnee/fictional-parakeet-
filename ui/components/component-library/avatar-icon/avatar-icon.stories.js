import React from 'react';
import {
  Size as SizeType,
  DISPLAY,
  AlignItems,
  BACKGROUND_COLORS, ICON_COLORS,Color
} from '../../../helpers/constants/design-system';

import Box from '../../ui/box/box';

import { ICON_NAMES } from '..';

import README from './README.mdx';
import { AvatarIcon, AVATAR_ICON_SIZES } from '.';

const marginSizeControlOptions = [
  undefined,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  'auto',
];

export default {
  title: 'Components/ComponentLibrary/AvatarIcon',

  component: AvatarIcon,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    iconName: {
      options: Object.values(ICON_NAMES),
      control: 'select',
    },
    size: {
      control: 'select',
      options: Object.values(AVATAR_ICON_SIZES),
    },
    backgroundColor: {
      control: 'select',
      options: Object.values(BACKGROUND_COLORS),
    },
    color: {
      control: 'select',
      options: Object.values(Color),
    },
    className: {
      control: 'text',
    },
    marginTop: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginRight: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginBottom: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginLeft: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
  },
  args: {
    size: SizeType.MD,
  },
};

const Template = (args) => {
  return <AvatarIcon iconName={ICON_NAMES.SWAP_HORIZONTAL} {...args} />;
};

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Default';

export const Size = (args) => (
  <Box display={DISPLAY.FLEX} alignItems={AlignItems.baseline} gap={1}>
    <AvatarIcon {...args} size={SizeType.XS} />
    <AvatarIcon {...args} size={SizeType.SM} />
    <AvatarIcon {...args} size={SizeType.MD} />
    <AvatarIcon {...args} size={SizeType.LG} />
    <AvatarIcon {...args} size={SizeType.XL} />
  </Box>
);

Size.args = {
  iconName: ICON_NAMES.CONFIRMATION,
};

export const IconName = (args) => (
  <Box display={DISPLAY.FLEX} gap={1}>
    <AvatarIcon
      color={ICON_COLORS.primaryDefault}
      backgroundColor={BACKGROUND_COLORS.primaryMuted}
      iconName={ICON_NAMES.SWAP_HORIZONTAL}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.successDefault}
      backgroundColor={BACKGROUND_COLORS.successMuted}
      iconName={ICON_NAMES.CONFIRMATION}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.infoDefault}
      backgroundColor={BACKGROUND_COLORS.infoMuted}
      iconName={ICON_NAMES.INFO}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.warningDefault}
      backgroundColor={BACKGROUND_COLORS.warningMuted}
      iconName={ICON_NAMES.WARNING}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.errorDefault}
      backgroundColor={BACKGROUND_COLORS.errorMuted}
      iconName={ICON_NAMES.DANGER}
      {...args}
    />
  </Box>
);

export const ColorAndBackgroundColor = (args) => (
  <Box display={DISPLAY.FLEX} gap={1}>
    <AvatarIcon
      color={ICON_COLORS.primaryDefault}
      backgroundColor={BACKGROUND_COLORS.primaryMuted}
      iconName={ICON_NAMES.SWAP_HORIZONTAL}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.primaryInverse}
      backgroundColor={BACKGROUND_COLORS.primaryDefault}
      iconName={ICON_NAMES.SWAP_HORIZONTAL}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.successDefault}
      backgroundColor={BACKGROUND_COLORS.successMuted}
      iconName={ICON_NAMES.CONFIRMATION}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.infoDefault}
      backgroundColor={BACKGROUND_COLORS.infoMuted}
      iconName={ICON_NAMES.INFO}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.warningDefault}
      backgroundColor={BACKGROUND_COLORS.warningMuted}
      iconName={ICON_NAMES.WARNING}
      {...args}
    />
    <AvatarIcon
      color={ICON_COLORS.errorDefault}
      backgroundColor={BACKGROUND_COLORS.errorMuted}
      iconName={ICON_NAMES.DANGER}
      {...args}
    />
  </Box>
);
