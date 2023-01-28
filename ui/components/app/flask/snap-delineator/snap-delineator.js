import React from 'react';
import PropTypes from 'prop-types';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import {
  BorderStyle,
  Size,
  BORDER_COLORS,
  BorderRadius,
  AlignItems,
  BACKGROUND_COLORS,
  ICON_COLORS,
  TextType,
  TEXT_COLORS,
} from '../../../../helpers/constants/design-system';
import Box from '../../../ui/box';
import { Icon, Text } from '../../../component-library';

export const SnapDelineator = ({ snapName, children }) => {
  const t = useI18nContext();

  return (
    <Box
      className="snap-delineator__wrapper"
      borderStyle={BorderStyle.solid}
      borderColor={BORDER_COLORS.borderMuted}
      borderRadius={BorderRadius.LG}
    >
      <Box
        className="snap-delineator__header"
        alignItems={AlignItems.center}
        backgroundColor={BACKGROUND_COLORS.infoMuted}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={1}
        paddingBottom={1}
      >
        <Icon name="snaps" color={ICON_COLORS.infoDefault} size={Size.SM} />
        <Text
          variant={TextType.bodySm}
          color={TEXT_COLORS.infoDefault}
          className="snap-delineator__header__text"
          marginLeft={1}
          marginTop={0}
          marginBottom={0}
        >
          {t('contentFromSnap', [snapName])}
        </Text>
      </Box>
      <Box className="snap-delineator__content" padding={4}>
        {children}
      </Box>
    </Box>
  );
};

SnapDelineator.propTypes = {
  snapName: PropTypes.string,
  children: PropTypes.ReactNode,
};
