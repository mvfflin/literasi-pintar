import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-gray-950 bg-white text-neutral-950 dark:text-neutral-200 px-5">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
