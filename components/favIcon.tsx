import Head from "next/head";

export default function Favicon() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="192 x192"
        href="/favIcons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favIcons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favIcons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favIcons/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="manifest" href="/favIcons/site.webmanifest" />
      <link rel="shortcut icon" href="/favIcons/favicon.ico" />
      <meta name="theme-color" content="#000" />
      <meta property="og:type" content="website"></meta>
      <meta name="msapplication-config" content="/favIcons/browserconfig.xml" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
    </>
  );
}
