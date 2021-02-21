import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core";
import { light as theme } from "src/themes";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-S018B8JR9X"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-S018B8JR9X');
        `,
            }}
          />
          {process.env.NEXT_PUBLIC_BASE_PATH?<script dangerouslySetInnerHTML={{__html:`if(confirm('Live demo can be viewed at c19statistics.vercel.app')) window.location.href="https://c19statistics.vercel.app/"`}}/>:<></>}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="google-site-verification"
            content="Ko7JRa6KsWM3DVrs4CYEQx6xPa8Uaksj9UnIzaRKonw"
          />
          <meta charSet="UTF-8" />
          <meta name="robots" content="index, follow" />
          <meta
            name="description"
            content="Keep up-to-date on COVID-19 cases with our global statistics and your country's cases timeline."
          />
          <link rel="icon" href={`${prefix}/favicon.ico`} />
          <link
            rel="stylesheet preconnect"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
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
