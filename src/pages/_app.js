import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "@/store";


// Basic MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3', // Property Genie blue-ish color
    },
    secondary: {
      main: '#ff6600', // Accent color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// For Next.js to properly handle emotion (MUI's default styling engine)
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;