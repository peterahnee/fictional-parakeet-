import { ActionConstants } from '../../store/constants/actions';

export default function reduceLocaleMessages(state = {}, { type, value }) {
  switch (type) {
    case ActionConstants.setCurrentLocale:
      return {
        ...state,
        current: value.messages,
        currentLocale: value.locale,
      };
    default:
      return state;
  }
}

export const getCurrentLocale = (state) => state.localeMessages.currentLocale;

export const getCurrentLocaleMessages = (state) => state.localeMessages.current;

export const getEnLocaleMessages = (state) => state.localeMessages.en;
