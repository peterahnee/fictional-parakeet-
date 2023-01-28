import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Chip from '../../../components/ui/chip';
import Box from '../../../components/ui/box';
import Typography from '../../../components/ui/typography';
import { ChipWithInput } from '../../../components/ui/chip/chip-with-input';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  TypographyType,
  BorderStyle,
  Size,
  DISPLAY,
  BORDER_COLORS,
} from '../../../helpers/constants/design-system';

export default function RecoveryPhraseChips({
  secretRecoveryPhrase,
  phraseRevealed,
  confirmPhase,
  setInputValue,
  inputValue,
  indicesToCheck,
  hiddenPhrase,
}) {
  const t = useI18nContext();
  const hideSeedPhrase = phraseRevealed === false;
  return (
    <Box
      borderColor={BORDER_COLORS.borderMuted}
      borderStyle={BorderStyle.solid}
      padding={4}
      borderWidth={1}
      borderRadius={Size.MD}
      display={DISPLAY.GRID}
      marginBottom={4}
      className="recovery-phrase__secret"
    >
      <div
        data-testid="recovery-phrase-chips"
        className={classnames('recovery-phrase__chips', {
          'recovery-phrase__chips--hidden': hideSeedPhrase,
        })}
      >
        {secretRecoveryPhrase.map((word, index) => {
          if (
            confirmPhase &&
            indicesToCheck &&
            indicesToCheck.includes(index)
          ) {
            return (
              <div className="recovery-phrase__chip-item" key={index}>
                <div className="recovery-phrase__chip-item__number">
                  {`${index + 1}.`}
                </div>
                <ChipWithInput
                  dataTestId={`recovery-phrase-input-${index}`}
                  borderColor={BORDER_COLORS.primaryDefault}
                  className="recovery-phrase__chip--with-input"
                  inputValue={inputValue[index]}
                  setInputValue={(value) => {
                    setInputValue({ ...inputValue, [index]: value });
                  }}
                />
              </div>
            );
          }
          return (
            <div className="recovery-phrase__chip-item" key={index}>
              <div className="recovery-phrase__chip-item__number">
                {`${index + 1}.`}
              </div>
              <Chip
                dataTestId={`recovery-phrase-chip-${index}`}
                className="recovery-phrase__chip"
                borderColor={COLORS.BORDER_DEFAULT}
              >
                {word}
              </Chip>
            </div>
          );
        })}
      </div>

      {hideSeedPhrase && (
        <div className="recovery-phrase__secret-blocker">
          {!hiddenPhrase && (
            <>
              <i className="far fa-eye" color="white" />
              <Typography
                variant={TypographyType.H6}
                color={BORDER_COLORS.borderDefault}
                className="recovery-phrase__secret-blocker--text"
              >
                {t('makeSureNoOneWatching')}
              </Typography>
            </>
          )}
        </div>
      )}
    </Box>
  );
}

RecoveryPhraseChips.propTypes = {
  secretRecoveryPhrase: PropTypes.array,
  phraseRevealed: PropTypes.bool,
  confirmPhase: PropTypes.bool,
  setInputValue: PropTypes.func,
  inputValue: PropTypes.string,
  indicesToCheck: PropTypes.array,
  hiddenPhrase: PropTypes.bool,
};
