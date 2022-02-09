import type { AppProps } from 'next/app';
import React, { Fragment, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, createEmotionCache } from '@/presentation/theme';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement != null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Fragment>
  );
}

export default MyApp;
