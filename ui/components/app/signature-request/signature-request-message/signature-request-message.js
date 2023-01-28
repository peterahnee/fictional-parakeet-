import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { I18nContext } from '../../../../contexts/i18n';
import Box from '../../../ui/box';
import Typography from '../../../ui/typography';
import {
  DISPLAY,
  FONT_WEIGHT,
  FLEX_DIRECTION,
  AlignItems,
  JustifyContent,
  Color,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  BorderRadius,
  TEXT_COLORS,
} from '../../../../helpers/constants/design-system';
import SignatureRequestData from '../signature-request-data';

export default function SignatureRequestMessage({
  data,
  onMessageScrolled,
  setMessageRootRef,
  messageRootRef,
  messageIsScrollable,
  primaryType,
}) {
  const t = useContext(I18nContext);
  const [messageIsScrolled, setMessageIsScrolled] = useState(false);
  const setMessageIsScrolledAtBottom = () => {
    if (!messageRootRef || messageIsScrolled) {
      return;
    }

    const { scrollTop, offsetHeight, scrollHeight } = messageRootRef;
    const isAtBottom = Math.round(scrollTop) + offsetHeight >= scrollHeight;

    if (isAtBottom) {
      setMessageIsScrolled(true);
      onMessageScrolled();
    }
  };

  return (
    <Box
      display={DISPLAY.FLEX}
      flexDirection={FLEX_DIRECTION.COLUMN}
      onScroll={debounce(setMessageIsScrolledAtBottom, 25)}
      className="signature-request-message"
    >
      {messageIsScrollable ? (
        <Box
          display={DISPLAY.FLEX}
          alignItems={AlignItems.center}
          justifyContent={JustifyContent.center}
          borderColor={BORDER_COLORS.borderDefault}
          backgroundColor={BACKGROUND_COLORS.backgroundDefault}
          color={Color.iconDefault}
          onClick={() => {
            setMessageIsScrolled(true);
            onMessageScrolled();
            messageRootRef?.scrollTo(0, messageRootRef?.scrollHeight);
          }}
          className="signature-request-message__scroll-button"
          data-testid="signature-request-scroll-button"
        >
          <i className="fa fa-arrow-down" aria-label={t('scrollDown')} />
        </Box>
      ) : null}
      <Box
        backgroundColor={BACKGROUND_COLORS.backgroundDefault}
        paddingBottom={3}
        paddingTop={3}
        paddingRight={3}
        margin={2}
        borderRadius={BorderRadius.XL}
        borderColor={BORDER_COLORS.borderMuted}
        className="signature-request-message__root"
        ref={setMessageRootRef}
      >
        <Typography
          fontWeight={FONT_WEIGHT.BOLD}
          color={TEXT_COLORS.textDefault}
          marginLeft={4}
          className="signature-request-message__title"
        >
          {primaryType}
        </Typography>
        <SignatureRequestData data={data} />
      </Box>
    </Box>
  );
}

SignatureRequestMessage.propTypes = {
  data: PropTypes.object.isRequired,
  onMessageScrolled: PropTypes.func,
  setMessageRootRef: PropTypes.func,
  messageRootRef: PropTypes.object,
  messageIsScrollable: PropTypes.bool,
  primaryType: PropTypes.string,
};
