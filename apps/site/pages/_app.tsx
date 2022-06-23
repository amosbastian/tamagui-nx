import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Tamagui from '../../../tamagui.config';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();

  // memo to avoid re-render on dark/light change
  const contents = React.useMemo(() => {
    return <Component {...pageProps} />;
  }, [pageProps]);

  // because we do our custom getCSS() above, we disableInjectCSS here
  return (
    <>
      <Head>{/* ... */}</Head>
      {/* @ts-ignore - NextThemeProvider type is broken */}
      <NextThemeProvider onChangeTheme={setTheme}>
        <Tamagui.Provider
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          {contents}
        </Tamagui.Provider>
      </NextThemeProvider>
    </>
  );
}
