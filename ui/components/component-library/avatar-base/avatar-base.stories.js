import React from 'react';
import {
  AlignItems,
  DISPLAY,
  TEXT_COLORS,
  BACKGROUND_COLORS,
  BORDER_COLORS,
} from '../../../helpers/constants/design-system';

import Box from '../../ui/box/box';

import README from './README.mdx';
import { AvatarBase } from './avatar-base';
import { AVATAR_BASE_SIZES } from './avatar-base.constants';

const marginSizeKnobOptions = [
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
  title: 'Components/ComponentLibrary/AvatarBase',

  component: AvatarBase,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AVATAR_BASE_SIZES),
    },
    color: {
      options: Object.values(TEXT_COLORS),
      control: 'select',
    },
    backgroundColor: {
      options: Object.values(BACKGROUND_COLORS),
      control: 'select',
    },
    borderColor: {
      options: Object.values(BORDER_COLORS),
      control: 'select',
    },
    display: {
      options: Object.values(DISPLAY),
      control: 'select',
      table: { category: 'box props' },
    },
    marginTop: {
      options: marginSizeKnobOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginRight: {
      options: marginSizeKnobOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginBottom: {
      options: marginSizeKnobOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginLeft: {
      options: marginSizeKnobOptions,
      control: 'select',
      table: { category: 'box props' },
    },
  },
  args: {
    size: AVATAR_BASE_SIZES.MD,
    color: TEXT_COLORS.textDefault,
    backgroundColor: BACKGROUND_COLORS.backgroundAlternative,
    borderColor: BORDER_COLORS.borderDefault,
  },
};

export const DefaultStory = (args) => <AvatarBase {...args}>B</AvatarBase>;

DefaultStory.storyName = 'Default';

export const Size = (args) => (
  <Box display={DISPLAY.FLEX} alignItems={AlignItems.baseline} gap={1}>
    <AvatarBase {...args} size={AVATAR_BASE_SIZES.XS} />
    <AvatarBase {...args} size={AVATAR_BASE_SIZES.SM} />
    <AvatarBase {...args} size={AVATAR_BASE_SIZES.MD} />
    <AvatarBase {...args} size={AVATAR_BASE_SIZES.LG} />
    <AvatarBase {...args} size={AVATAR_BASE_SIZES.XL} />
  </Box>
);

export const Children = (args) => (
  <Box display={DISPLAY.FLEX} gap={1}>
    <AvatarBase {...args}>
      <img src="./images/eth_logo.svg" />
    </AvatarBase>
    <AvatarBase {...args}>
      <img width="100%" src="./images/arbitrum.svg" />
    </AvatarBase>
    <AvatarBase {...args}>
      <img width="100%" src="./images/avax-token.png" />
    </AvatarBase>
    <AvatarBase {...args}>A</AvatarBase>
    <AvatarBase
      {...args}
      backgroundColor={BACKGROUND_COLORS.infoMuted}
      borderColor={BORDER_COLORS.infoMuted}
    >
      <i
        className="fa fa-user"
        style={{ color: 'var(--color-info-default)' }}
      />
    </AvatarBase>
  </Box>
);

export const ColorBackgroundColorAndBorderColor = (args) => (
  <Box display={DISPLAY.FLEX} gap={1}>
    <AvatarBase {...args}>B</AvatarBase>
    <AvatarBase
      {...args}
      backgroundColor={BACKGROUND_COLORS.goerli}
      borderColor={BORDER_COLORS.goerli}
      color={TEXT_COLORS.primaryInverse}
    >
      G
    </AvatarBase>
    <AvatarBase
      {...args}
      backgroundColor={BACKGROUND_COLORS.sepolia}
      borderColor={BORDER_COLORS.sepolia}
      color={TEXT_COLORS.primaryInverse}
    >
      S
    </AvatarBase>
  </Box>
);
