import GoogleAnalytics from "../components/GoogleAnalytics";
import MetaPixel from "../components/MetaPixel";
import "../styles/responsive.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
      <Component {...pageProps} />
    </>
  );
}
