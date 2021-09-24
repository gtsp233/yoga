import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import * as tokens from '@gympass/yoga-tokens';
import yogaTheme from '../theme';

/**
 * Gets resolved theme to inject in Yoga
 *
 * @param {{locale: string, theme: function}} themeParameters information about the theme
 * @param {string} themeParameters.locale custom locale to get colors from (if it has a different scheme)
 * @param {function} themeParameters.theme returns a custom theme object to replace existing tokens
 * @returns {Object.<string, string | number>} theme object with tokens sent to styled-components' <ThemeProvider />
 */
const getTheme = ({ locale, theme }) => {
  const token = tokens[locale] || tokens.default;
  const defaultTheme = yogaTheme(token);

  return theme ? yogaTheme(defaultTheme, theme(token)) : yogaTheme(token);
};

/** This component provides a theme to all React components underneath itself via the context API. */
const Provider = ({ locale, theme, ...rest }) => (
  <ThemeProvider theme={{ yoga: getTheme({ locale, theme }) }} {...rest} />
);

Provider.propTypes = {
  locale: PropTypes.string,
};

Provider.defaultProps = {
  locale: 'pt-BR',
};

export default Provider;
