import type { AppProps } from 'next/app';
import React, { Fragment, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, CssBaseline } from '@material-ui/core';
import { theme } from '@/presentation/theme';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement != null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider injectFirst>
          <Component {...pageProps} />
        </StylesProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
