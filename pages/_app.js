import GoogleAnalytics from "../components/GoogleAnalytics";
import "../styles/responsive.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
