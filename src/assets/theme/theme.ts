import { createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const darkColors = {
  dominant: '#001e3c',
  dominant50: '#1a2027',
  accent: '#cdd2d7',
  accent50: '#cdd2d7',
  compliment: '#78FAC6',
};

export const lightColors = {
  dominant: '#FFFDFA',
  dominant50: '#F1EFEC',
  accent: '#110F0C',
  accent50: '#31302E',
  compliment: '#BCA987',
};

export type ColorsInterface = typeof darkColors;

// 👇️ type Keys = "name" | "age" | "country"
export type ColorType = keyof typeof darkColors;

const typography: TypographyOptions = {
  fontFamily: ['Roboto', 'sans-serif'].join(','),
};

export const darkTheme = createTheme({
  typography,
  colors: darkColors,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: darkColors.accent50,
          backgroundColor: darkColors.dominant,
          position: 'relative',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  typography,
  colors: lightColors,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: lightColors.accent50,
          backgroundColor: lightColors.dominant,
          position: 'relative',
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    colors: ColorsInterface;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: ColorsInterface;
  }
}
