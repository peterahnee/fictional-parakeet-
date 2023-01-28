import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  Color,
  FONT_WEIGHT,
  FONT_STYLE,
  TEXT_ALIGN,
  TypographyType,
  OVERFLOW_WRAP,
} from '../../../helpers/constants/design-system';
import Box, { MultipleSizesAndAuto } from '../box';

const { H6, H7, H8, H9 } = TypographyType;

export const ValidColors = [
  Color.textDefault,
  Color.textAlternative,
  Color.textMuted,
  Color.overlayInverse,
  Color.primaryDefault,
  Color.primaryInverse,
  Color.errorDefault,
  Color.errorInverse,
  Color.successDefault,
  Color.sepoliaInverse,
  Color.warningDefault,
  Color.warningInverse,
  Color.infoDefault,
  Color.infoInverse,
  Color.goerli,
  Color.sepolia,
  Color.goerli,
  Color.sepoliaInverse,
];

export const ValidTags = [
  'dd',
  'div',
  'dt',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'p',
  'span',
  'strong',
  'ul',
  'label',
];

export default function Typography({
  variant = TypographyType.paragraph,
  color = Color.textDefault,
  fontWeight = 'normal',
  fontStyle = 'normal',
  align,
  overflowWrap,
  title,
  as,
  margin,
  marginTop = 1,
  marginRight,
  marginBottom = 1,
  marginLeft,
  boxProps = {},
  className,
  children,
}) {
  let Tag = as ?? variant;
  let strongTagFontWeight;

  if (Tag === 'strong') {
    strongTagFontWeight = FONT_WEIGHT.BOLD;
  }

  const computedClassName = classnames(
    'typography',
    className,
    `typography--${variant}`,
    `typography--weight-${strongTagFontWeight || fontWeight}`,
    `typography--style-${fontStyle}`,
    {
      [`typography--align-${align}`]: Boolean(align),
      [`typography--color-${color}`]: Boolean(color),
      [`typography--overflowwrap-${overflowWrap}`]: Boolean(overflowWrap),
    },
  );

  if (Tag === TypographyType.paragraph) {
    Tag = 'p';
  } else if ([H7, H8, H9].includes(Tag)) {
    Tag = H6;
  }

  return (
    <Box
      {...{
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        ...boxProps,
      }}
    >
      {(boxClassName) => (
        <Tag
          className={classnames(boxClassName, computedClassName)}
          title={title}
        >
          {children}
        </Tag>
      )}
    </Box>
  );
}

Typography.propTypes = {
  /**
   * The variation of font sizes of the Typography component
   */
  variant: PropTypes.oneOf(Object.values(TypographyType)),
  /**
   * The color of the Typography component Should use the COLOR object from
   * ./ui/helpers/constants/design-system.js
   */
  color: PropTypes.oneOf(ValidColors),
  /**
   * The font-weight of the Typography component. Should use the FONT_WEIGHT object from
   * ./ui/helpers/constants/design-system.js
   */
  fontWeight: PropTypes.oneOf(Object.values(FONT_WEIGHT)),
  /**
   * The font-style of the Typography component. Should use the FONT_STYLE object from
   * ./ui/helpers/constants/design-system.js
   */
  fontStyle: PropTypes.oneOf(Object.values(FONT_STYLE)),
  /**
   * The text-align of the Typography component. Should use the TEXT_ALIGN object from
   * ./ui/helpers/constants/design-system.js
   */
  align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
  /**
   * The overflow-wrap of the Typography component. Should use the OVERFLOW_WRAP object from
   * ./ui/helpers/constants/design-system.js
   */
  overflowWrap: PropTypes.oneOf(Object.values(OVERFLOW_WRAP)),
  /**
   * Changes the root html element of the Typography component.
   */
  as: PropTypes.oneOf(ValidTags),
  /**
   * Adds margin to the Typography component should use valid size
   */
  margin: MultipleSizesAndAuto,
  marginTop: MultipleSizesAndAuto,
  marginBottom: MultipleSizesAndAuto,
  marginRight: MultipleSizesAndAuto,
  marginLeft: MultipleSizesAndAuto,
  /**
   * Used to pass any valid Box component props such as margin or padding
   * to the Typography component
   */
  boxProps: PropTypes.shape({
    ...Box.propTypes,
  }),
  /**
   * Additional className to assign the Typography component
   */
  className: PropTypes.string,
  /**
   * Title attribute to include on the element. Will show as tooltip on hover.
   */
  title: PropTypes.string,
  /**
   * The text content of the Typography component
   */
  children: PropTypes.node.isRequired,
};
