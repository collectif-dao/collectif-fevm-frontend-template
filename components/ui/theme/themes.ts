import themeBase from './base';
import { ThemeName } from './constants';

export const themeLight = {
  ...themeBase,
  name: ThemeName.light,
  colors: {
    ...themeBase.colors,
    darkThemeOpacity: '0',
    lightThemeOpacity: '1',

    lightModeVisibility: 'visible',
    darkModeVisibility: 'hidden',

    lightDisplay: 'initial',
    darkDisplay: 'none',

    primary: '#202020',
    primaryHover: 'rgba(0, 0, 0, 0.8)',

    secondary: '#273852',
    secondaryHover: '#212f45',
    secondaryContrast: '#fff',

    background: '#fafafa',
    backgroundDarken: '#dae0e5',

    foreground: '#fff',

    overlay: 'rgba(0, 0, 0, 0.5)',

    shadowLight: 'rgba(39, 56, 82, 0.08)',
    shadowDark: 'rgba(0, 0, 0, .25)',

    text: '#191919',
    textSecondary: '#808080',
    accentText: '#273852',

    border: '#f2f2f2',
    borderActive: '#f2f2f2',
    borderHover: '#f2f2f2',
    borderLight: '#f2f2f2',
    accentBorder: '#f2f2f2',
    accentBorderHover: '#f2f2f2',

    controlBg: '#f7f7f7',
    accentControlBg: 'rgba(239, 242, 246, 0.56)',

    popupMenuItemBgActiveHover: '#000a3d',
  },
};

export const themeDark = {
  ...themeBase,
  name: ThemeName.dark,
  colors: {
    ...themeBase.colors,
    darkThemeOpacity: '1',
    lightThemeOpacity: '0',

    lightModeVisibility: 'hidden',
    darkModeVisibility: 'visible',

    lightDisplay: 'none',
    darkDisplay: 'initial',

    secondary: 'rgba(255, 255, 255, .8)',
    secondaryHover: '#fff',
    secondaryContrast: '#273852',

    background: '#1c1c21',
    backgroundDarken: '#131317',

    foreground: '#34343d',

    overlay: 'rgba(0, 0, 0, 0.5)',

    shadowLight: 'rgba(0, 0, 0, .25)',
    shadowDark: 'rgba(0, 0, 0, .5)',

    text: '#fff',
    textSecondary: 'rgba(255, 255, 255, .8)',
    accentText: '#fff',

    border: 'rgba(255, 255, 255, 0.12)',
    borderActive: 'rgba(255, 255, 255, 0.48)',
    borderHover: 'rgba(255, 255, 255, 0.24)',
    borderLight: '#484855',
    accentBorder: 'rgba(255, 255, 255, 0.12)',
    accentBorderHover: 'rgba(255, 255, 255, 0.24)',

    controlBg: '#2f2f37',
    accentControlBg: 'rgba(39, 39, 46, 0.56)',

    popupMenuItemBgActiveHover: '#fff',
  },
};

export const themeMap = {
  [ThemeName.light]: themeLight,
  [ThemeName.dark]: themeDark,
};

export const reverseThemeMap = new WeakMap([
  [themeLight, ThemeName.light],
  [themeDark, ThemeName.dark],
]);

export const themeDefault = themeLight;
