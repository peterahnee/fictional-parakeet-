import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BannerBase, Icon, ICON_NAMES } from '..';

import {
  BACKGROUND_COLORS,
  ICON_COLORS,
  SEVERITIES,
  Size,
} from '../../../helpers/constants/design-system';
import { BANNER_SEVERITIES } from './banner.constants';

export const Banner = ({
  children,
  className,
  severity = SEVERITIES.INFO,
  ...props
}) => {
  const severityIcon = () => {
    switch (severity) {
      case SEVERITIES.DANGER:
        return {
          name: ICON_NAMES.DANGER,
          color: ICON_COLORS.errorDefault,
        };
      case SEVERITIES.WARNING:
        return {
          name: ICON_NAMES.WARNING,
          color: ICON_COLORS.warningDefault,
        };
      case SEVERITIES.SUCCESS:
        return {
          name: ICON_NAMES.CONFIRMATION,
          color: ICON_COLORS.successDefault,
        };
      // Defaults to SEVERITIES.INFO
      default:
        return {
          name: ICON_NAMES.INFO,
          color: ICON_COLORS.primaryDefault,
        };
    }
  };

  const severityBackground = () => {
    switch (severity) {
      case SEVERITIES.DANGER:
        return BACKGROUND_COLORS.errorMuted;
      case SEVERITIES.WARNING:
        return BACKGROUND_COLORS.warningMuted;
      case SEVERITIES.SUCCESS:
        return BACKGROUND_COLORS.successMuted;
      // Defaults to SEVERITIES.INFO
      default:
        return BACKGROUND_COLORS.primaryMuted;
    }
  };

  return (
    <BannerBase
      startAccessory={<Icon size={Size.LG} {...severityIcon()} />}
      backgroundColor={severityBackground()}
      className={classnames(
        'mm-banner',
        {
          [`mm-banner--severity-${severity}`]:
            Object.values(BANNER_SEVERITIES).includes(severity),
        },
        className,
      )}
      {...props}
    >
      {children}
    </BannerBase>
  );
};

Banner.propTypes = {
  /**
   * An additional className to apply to the Banner
   */
  className: PropTypes.string,
  /**
   * Use the `severity` prop and the `SEVERITIES` object from `./ui/helpers/constants/design-system.js` to change the context of `Banner`.
   * Possible options: `SEVERITIES.INFO`(Default), `SEVERITIES.WARNING`, `SEVERITIES.DANGER`, `SEVERITIES.SUCCESS`
   */
  severity: PropTypes.oneOf(Object.values(BANNER_SEVERITIES)),
  /**
   * Banner accepts all the props from BannerBase
   */
  ...BannerBase.propTypes,
};
