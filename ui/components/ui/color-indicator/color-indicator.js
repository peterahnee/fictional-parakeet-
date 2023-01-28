import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { BORDER_COLORS, ICON_COLORS, Size } from '../../../helpers/constants/design-system';

export default function ColorIndicator({
  size = Size.SM,
  type = 'outlined',
  color = ICON_COLORS.ICON_MUTED,
  borderColor,
  iconClassName,
}) {
  const colorIndicatorClassName = classnames('color-indicator', {
    'color-indicator--filled': type === 'filled' || Boolean(iconClassName),
    'color-indicator--partial-filled': type === 'partial-filled',
    [`color-indicator--border-color-${borderColor}`]: Boolean(borderColor),
    [`color-indicator--color-${color}`]: true,
    [`color-indicator--size-${size}`]: true,
  });

  return (
    <div
      className={colorIndicatorClassName}
      data-testid={`color-icon-${color}`}
    >
      {iconClassName ? (
        <i className={classnames('color-indicator__icon', iconClassName)} />
      ) : (
        <span className="color-indicator__inner-circle" />
      )}
    </div>
  );
}

ColorIndicator.TYPES = {
  FILLED: 'filled',
  PARTIAL: 'partial-filled',
  OUTLINE: 'outline',
};

ColorIndicator.propTypes = {
  color: PropTypes.oneOf(ICON_COLORS),
  borderColor: PropTypes.oneOf(BORDER_COLORS),
  size: PropTypes.oneOf(Object.values(Size)),
  iconClassName: PropTypes.string,
  type: PropTypes.oneOf(Object.values(ColorIndicator.TYPES)),
};
