import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="og:title" content="Literasi Pintar" />
        <meta
          name="og:description"
          content="Website tempat kamu mencari buku kesukaanmu!"
        />
      </Head>
      <body className="dark:bg-gray-950 bg-white text-neutral-950 dark:text-neutral-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
