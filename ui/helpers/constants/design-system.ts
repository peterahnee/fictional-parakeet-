/**
 * A note about the existence of both singular and plural variable names here:
 * When dealing with a literal property name, e.g. ALIGN_ITEMS, the constant
 * should match the property. When detailing a collection of things, it should
 * match the plural form of the thing. e.g. COLORS, TYPOGRAPHY
 */

import pick from 'lodash/pick';

export enum Color {
  backgroundDefault = 'background-default',
  backgroundAlternative = 'background-alternative',
  textDefault = 'text-default',
  textAlternative = 'text-alternative',
  textMuted = 'text-muted',
  iconDefault = 'icon-default',
  iconAlternative = 'icon-alternative',
  iconMuted = 'icon-muted',
  borderDefault = 'border-default',
  borderMuted = 'border-muted',
  overlayDefault = 'overlay-default',
  overlayInverse = 'overlay-inverse',
  primaryDefault = 'primary-default',
  primaryAlternative = 'primary-alternative',
  primaryMuted = 'primary-muted',
  primaryInverse = 'primary-inverse',
  primaryDisabled = 'primary-disabled',
  errorDefault = 'error-default',
  errorAlternative = 'error-alternative',
  errorMuted = 'error-muted',
  errorInverse = 'error-inverse',
  errorDisabled = 'error-disabled',
  warningDefault = 'warning-default',
  warningAlternative = 'warning-alternative',
  warningMuted = 'warning-muted',
  warningInverse = 'warning-inverse',
  warningDisabled = 'warning-disabled',
  successDefault = 'success-default',
  successAlternative = 'success-alternative',
  successMuted = 'success-muted',
  successInverse = 'success-inverse',
  successDisabled = 'success-disabled',
  infoDefault = 'info-default',
  infoAlternative = 'info-alternative',
  infoMuted = 'info-muted',
  infoInverse = 'info-inverse',
  infoDisabled = 'info-disabled',
  mainnet = 'mainnet',
  goerli = 'goerli',
  sepolia = 'sepolia',
  transparent = 'transparent',
  localhost = 'localhost',
  inherit = 'inherit',
  goerliInverse = 'goerli-inverse',
  sepoliaInverse = 'sepolia-inverse',
}

export const BACKGROUND_COLORS = pick(Color, [
  'backgroundDefault',
  'backgroundAlternative',
  'overlayDefault',
  'primaryDefault',
  'primaryAlternative',
  'primaryMuted',
  'errorDefault',
  'errorAlternative',
  'errorMuted',
  'warningDefault',
  'warningAlternative',
  'warningMuted',
  'successDefault',
  'successAlternative',
  'successMuted',
  'infoDefault',
  'infoAlternative',
  'infoMuted',
  'mainnet',
  'goerli',
  'sepolia',
  'transparent',
  'localhost',
]);

export const BORDER_COLORS = pick(Color, [
  'borderDefault',
  'borderMuted',
  'primaryDefault',
  'primaryAlternative',
  'primaryMuted',
  'errorDefault',
  'errorAlternative',
  'errorMuted',
  'warningDefault',
  'warningAlternative',
  'warningMuted',
  'successDefault',
  'successAlternative',
  'successMuted',
  'infoDefault',
  'infoAlternative',
  'infoMuted',
  'mainnet',
  'goerli',
  'sepolia',
  'transparent',
  'localhost',
]);

export const TEXT_COLORS = pick(Color, [
  'textDefault',
  'textAlternative',
  'textMuted',
  'primaryDefault',
  'primaryInverse',
  'errorDefault',
  'errorInverse',
  'successDefault',
  'successInverse',
  'warningDefault',
  'warningInverse',
  'infoDefault',
  'infoInverse',
  'inherit',
  'goerli',
  'sepolia',
  'goerliInverse',
  'sepoliaInverse',
]);

export const ICON_COLORS = pick(Color, [
  'iconDefault',
  'iconAlternative',
  'iconMuted',
  'overlayInverse',
  'primaryDefault',
  'primaryInverse',
  'errorDefault',
  'errorInverse',
  'successDefault',
  'successInverse',
  'warningDefault',
  'warningInverse',
  'infoDefault',
  'infoInverse',
  'inherit',
  'goerli',
  'sepolia',
  'goerliInverse',
  'sepoliaInverse',
]);

export enum TypographyType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  H7 = 'h7',
  H8 = 'h8',
  H9 = 'h9',
  paragraph = 'p',
  span = 'span',
}

export enum TextType {
  displayMd = 'display-md',
  headingLg = 'heading-lg',
  headingMd = 'heading-md',
  headingSm = 'heading-sm',
  bodyLgMedium = 'body-lg-medium',
  bodyMd = 'body-md',
  bodyMdBold = 'body-md-bold',
  bodySm = 'body-sm',
  bodySmBold = 'body-sm-bold',
  bodyXs = 'body-xs',
  inherit = 'inherit',
}

export enum Size {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  inherit = 'inherit', // Used for Text, Icon, and Button components to inherit the parent elements font-size
  auto = 'auto',
  none = 'none',
}

export enum BorderStyle {
  dashed = 'dashed',
  solid = 'solid',
  dotted = 'dotted',
  double = 'double',
  none = 'none',
}

export enum BorderRadius {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  none = 'none',
  pill = 'pill',
  full = 'full',
}

export enum AlignItems {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  baseline = 'baseline',
  stretch = 'stretch',
}

export enum JustifyContent {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export const FLEX_DIRECTION = {
  ROW: 'row',
  ROW_REVERSE: 'row-reverse',
  COLUMN: 'column',
  COLUMN_REVERSE: 'column-reverse',
};

export const FLEX_WRAP = {
  WRAP: 'wrap',
  WRAP_REVERSE: 'wrap-reverse',
  NO_WRAP: 'nowrap',
};

export const DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  GRID: 'grid',
  INLINE_BLOCK: 'inline-block',
  INLINE: 'inline',
  INLINE_FLEX: 'inline-flex',
  INLINE_GRID: 'inline-grid',
  LIST_ITEM: 'list-item',
  NONE: 'none',
};

export const FRACTIONS = {
  HALF: '1/2',
  ONE_THIRD: '1/3',
  TWO_THIRDS: '2/3',
  ONE_FOURTH: '1/4',
  TWO_FOURTHS: '2/4',
  THREE_FOURTHS: '3/4',
  ONE_FIFTH: '1/5',
  TWO_FIFTHS: '2/5',
  THREE_FIFTHS: '3/5',
  FOUR_FIFTHS: '4/5',
  ONE_SIXTH: '1/6',
  TWO_SIXTHS: '2/6',
  THREE_SIXTHS: '3/6',
  FOUR_SIXTHS: '4/6',
  FIVE_SIXTHS: '5/6',
  ONE_TWELFTH: '1/12',
  TWO_TWELFTHS: '2/12',
  THREE_TWELFTHS: '3/12',
  FOUR_TWELFTHS: '4/12',
  FIVE_TWELFTHS: '5/12',
  SIX_TWELFTHS: '6/12',
  SEVEN_TWELFTHS: '7/12',
  EIGHT_TWELFTHS: '8/12',
  NINE_TWELFTHS: '9/12',
  TEN_TWELFTHS: '10/12',
  ELEVEN_TWELFTHS: '11/12',
};

export const BLOCK_SIZES = {
  ...FRACTIONS,
  SCREEN: 'screen',
  MAX: 'max',
  MIN: 'min',
  FULL: 'full',
};

export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  JUSTIFY: 'justify',
  END: 'end',
};

export const TEXT_TRANSFORM = {
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  CAPITALIZE: 'capitalize',
};

export const FONT_WEIGHT = {
  BOLD: 'bold',
  MEDIUM: 'medium',
  NORMAL: 'normal',
};

export const OVERFLOW_WRAP = {
  BREAK_WORD: 'break-word',
  ANYWHERE: 'anywhere',
  NORMAL: 'normal',
};

export const FONT_STYLE = {
  ITALIC: 'italic',
  NORMAL: 'normal',
};

export const SEVERITIES = {
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export const RESIZE = {
  NONE: 'none',
  BOTH: 'both',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  INITIAL: 'initial',
  inherit: 'inherit',
};

export const BREAKPOINTS = ['base', 'sm', 'md', 'lg'];
