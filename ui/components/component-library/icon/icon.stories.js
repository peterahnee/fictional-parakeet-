import React, { useState } from 'react';
import {
  Size as SizeType,
  AlignItems,
  DISPLAY,
  ICON_COLORS,
  FLEX_DIRECTION,
  JustifyContent,
  TextType,
  FLEX_WRAP,
  TEXT_ALIGN,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  Color as ColorType,
} from '../../../helpers/constants/design-system';

import Box from '../../ui/box/box';

import {
  ButtonIcon,
  ButtonLink,
  ICON_NAMES,
  ICON_SIZES,
  Icon,
  Label,
  Text,
  TextField,
  TextFieldSearch,
} from '..';

import README from './README.mdx';

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
  title: 'Components/ComponentLibrary/Icon',

  component: Icon,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.values(ICON_NAMES),
    },
    size: {
      control: 'select',
      options: Object.values(ICON_SIZES),
    },
    color: {
      control: 'select',
      options: Object.values(ICON_COLORS),
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
    name: ICON_NAMES.ADD_SQUARE,
    color: ICON_COLORS.inherit,
    size: SizeType.MD,
  },
};

export const DefaultStory = (args) => {
  const [search, setSearch] = useState('');
  const iconList = Object.keys(ICON_NAMES)
    .filter(
      (item) =>
        search === '' ||
        item.toLowerCase().includes(search.toLowerCase().replace(' ', '_')),
    )
    .sort();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClear = () => {
    setSearch('');
  };

  return (
    <>
      <Text as="h2" marginBottom={2} variant={TextType.headingMd}>
        Icon search
      </Text>
      <Box
        display={DISPLAY.GRID}
        gap={2}
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        }}
      >
        <Box
          style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
          display={DISPLAY.FLEX}
          flexDirection={FLEX_DIRECTION.COLUMN}
        >
          {/* TODO replace with FormTextField */}
          <Label htmlFor="icon-search">Name</Label>
          <TextFieldSearch
            id="icon-search"
            marginBottom={4}
            onChange={handleSearch}
            clearButtonOnClick={handleOnClear}
            value={search}
            placeholder="Search icon name"
          />
        </Box>
      </Box>
      {iconList.length > 0 ? (
        <Box
          display={DISPLAY.GRID}
          gap={2}
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          }}
        >
          {iconList.map((item) => {
            return (
              <Box
                borderColor={BORDER_COLORS.borderMuted}
                borderRadius={SizeType.MD}
                display={DISPLAY.FLEX}
                flexDirection={FLEX_DIRECTION.COLUMN}
                alignItems={AlignItems.center}
                justifyContent={JustifyContent.center}
                padding={4}
                key={item}
              >
                <Icon marginBottom={2} {...args} name={ICON_NAMES[item]} />
                <TextField
                  placeholder={item}
                  value={item}
                  readOnly
                  size={SizeType.SM}
                  inputProps={{
                    variant: TextType.bodyXs,
                    textAlign: TEXT_ALIGN.CENTER,
                  }}
                  backgroundColor={BACKGROUND_COLORS.backgroundAlternative}
                  rightAccessory={
                    <ButtonIcon
                      iconName={ICON_NAMES.COPY}
                      size={SizeType.SM}
                      color={ICON_COLORS.iconAlternative}
                      ariaLabel="Copy to clipboard"
                      title="Copy to clipboard"
                      onClick={() => {
                        const tempEl = document.createElement('textarea');
                        tempEl.value = item;
                        document.body.appendChild(tempEl);
                        tempEl.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempEl);
                      }}
                    />
                  }
                />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Text>
          No matches. Please try again or ask in the{' '}
          <ButtonLink
            size={SizeType.inherit}
            color={ColorType.primaryDefault}
            href="https://consensys.slack.com/archives/C0354T27M5M"
            target="_blank"
          >
            #metamask-design-system
          </ButtonLink>{' '}
          channel on slack.
        </Text>
      )}
    </>
  );
};
DefaultStory.storyName = 'Default';

export const Name = (args) => (
  <>
    <Box display={DISPLAY.FLEX} flexWrap={FLEX_WRAP.WRAP} gap={2}>
      {Object.keys(ICON_NAMES).map((item) => {
        console.log('item:', item);
        return (
          <Box
            borderColor={BORDER_COLORS.borderMuted}
            borderRadius={SizeType.MD}
            display={DISPLAY.FLEX}
            flexDirection={FLEX_DIRECTION.COLUMN}
            alignItems={AlignItems.center}
            justifyContent={JustifyContent.center}
            padding={4}
            key={item}
          >
            <Icon {...args} name={ICON_NAMES[item]} />
          </Box>
        );
      })}
    </Box>
  </>
);

export const Size = (args) => (
  <>
    <Box
      display={DISPLAY.FLEX}
      alignItems={AlignItems.baseline}
      gap={1}
      marginBottom={4}
    >
      <Icon {...args} size={SizeType.XXS} />
      <Icon {...args} size={SizeType.XS} />
      <Icon {...args} size={SizeType.SM} />
      <Icon {...args} size={SizeType.MD} />
      <Icon {...args} size={SizeType.LG} />
      <Icon {...args} size={SizeType.XL} />
    </Box>
    <Text as="p" variant={TextType.bodySm}>
      <Icon {...args} size={SizeType.inherit} /> inherits the font-size of the
      parent element.
    </Text>
  </>
);

export const Color = (args) => (
  <Box display={DISPLAY.FLEX} alignItems={AlignItems.baseline}>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.inherit} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.iconDefault} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.iconAlternative} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.iconMuted} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.overlayDefault}
    >
      <Icon {...args} color={ICON_COLORS.overlayInverse} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.primaryDefault} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.primaryDefault}
    >
      <Icon {...args} color={ICON_COLORS.primaryInverse} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.errorDefault} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.errorDefault}
    >
      <Icon {...args} color={ICON_COLORS.errorInverse} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.successDefault} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.successDefault}
    >
      <Icon {...args} color={ICON_COLORS.successInverse} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.warningDefault} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.warningDefault}
    >
      <Icon {...args} color={ICON_COLORS.warningInverse} />
    </Box>
    <Box padding={1} display={DISPLAY.FLEX} alignItems={AlignItems.center}>
      <Icon {...args} color={ICON_COLORS.infoDefault} />
    </Box>
    <Box
      padding={1}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      backgroundColor={BACKGROUND_COLORS.infoDefault}
    >
      <Icon {...args} color={ICON_COLORS.infoInverse} />
    </Box>
  </Box>
);
