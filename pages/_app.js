import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import MetaPixel from "../components/MetaPixel";
import "../styles/responsive.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FotoIA Pro | Fotos de productos profesionales con IA</title>
        <meta name="description" content="Convierte fotos de tus productos en imágenes profesionales para menús, flyers, anuncios, redes sociales, catálogos y publicidad con inteligencia artificial." />
        <meta name="robots" content="index, follow" />
        <link key="canonical" rel="canonical" href="https://www.fotoia.pro/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="FotoIA Pro | Fotos de productos profesionales con IA" />
        <meta property="og:description" content="Convierte fotos de productos en imágenes profesionales para publicidad, redes sociales, menús, flyers y catálogos con IA." />
        <meta key="og:url" property="og:url" content="https://www.fotoia.pro/" />
        <meta property="og:site_name" content="FotoIA Pro" />
        <meta property="og:image" content="https://www.fotoia.pro/icon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FotoIA Pro | Fotos de productos profesionales con IA" />
        <meta name="twitter:description" content="Convierte fotos de productos en imágenes profesionales para marketing y publicidad con inteligencia artificial." />
        <meta name="twitter:image" content="https://www.fotoia.pro/icon.png" />
      </Head>

      <GoogleAnalytics />
      <MetaPixel />
      <Component {...pageProps} />
    </>
  );
}
