export const lightTheme = {
  '--danger-red': '#f5222d',
  '--success-green': '#39c16c',
  '--default-dark': '#e2e2e2',
  '--default-white': '#fff',
  '--secondary-white': '#f4f4f4',
  '--constant-white': '#fff',
  '--text-color': '#000'
}

export const darkTheme = {
  '--danger-red': '#f5222d',
  '--success-green': '#39c16c',
  '--default-dark': '#111',
  '--default-white': '#444444',
  '--secondary-white': '#333',
  '--constant-white': '#fff',
  '--text-color': '#fff'
}

export const wagner =  {
  'blue': '#2CC9D1',
  'coral': '#FF625B',
  'green': '#67DD9B',
  'yellow': '#FFEC33'
}

import { red } from '@material-ui/core/colors';
import { light } from '@material-ui/core/styles/createPalette';
export const normal = {
  palette: {
    type: 'light',
    primary: {
      main: wagner.blue,
    },
    secondary: {
      main: wagner.coral,
    },
    textPrimary: {
      main: wagner.blue,
    },
    textSecondary: {
      main: wagner.coral,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    titleBar: {
      main: '#eeeeee',
      contrastText: '#222222',
    },
  },
}

export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: wagner.blue,
      light: 'rgb(81, 91, 95)',
      dark: 'rgb(26, 35, 39)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: wagner.coral,
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    titleBar: {
      main: '#555555',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
}