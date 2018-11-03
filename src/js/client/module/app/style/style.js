import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#272822',
      contrastText: '#a6e22e',
    },
    secondary: {
      main: '#f92672',
    },
  },
});

/*
Black: 272822
PInk: f92672
Blue: 66d9ef
GReen: a6e22e
 ORange: fd971f
*/
