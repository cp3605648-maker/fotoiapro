import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import MetaPixel from "../components/MetaPixel";
import "../styles/responsive.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FotoIA Pro | Convierte tus fotos en imágenes profesionales con IA</title>
        <meta name="description" content="Transforma cualquier foto con inteligencia artificial. Crea imágenes para LinkedIn, Instagram, Shopify, CV, publicidad y ecommerce en segundos." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.fotoia.pro/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="FotoIA Pro | Fotos profesionales con inteligencia artificial" />
        <meta property="og:description" content="Convierte tus fotos en imágenes profesionales para redes sociales, ecommerce, branding, CV y marketing con IA." />
        <meta property="og:url" content="https://www.fotoia.pro/" />
        <meta property="og:site_name" content="FotoIA Pro" />
        <meta property="og:image" content="https://www.fotoia.pro/icon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FotoIA Pro | Fotos profesionales con IA" />
        <meta name="twitter:description" content="Transforma cualquier foto en una imagen profesional con inteligencia artificial en segundos." />
        <meta name="twitter:image" content="https://www.fotoia.pro/icon.png" />
      </Head>

      <GoogleAnalytics />
      <MetaPixel />
      <Component {...pageProps} />
    </>
  );
}
