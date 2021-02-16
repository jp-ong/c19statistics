import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/lightTheme";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-ZWR7KJFE6F"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-ZWR7KJFE6F');
        `,
            }}
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta charSet="UTF-8" />
          <meta name="robots" content="index, follow" />
          <meta
            name="description"
            content="Keep up-to-date with COVID-19 cases with our global statistics and country statistical summary."
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet preconnect"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="canonical" href="http://next-covid-app.vercel.app/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
