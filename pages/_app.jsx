import "@/styles/globals.css";
import LayoutFont from "@/Layouts/LayoutFont";

export default function App({ Component, pageProps }) {
  return (
    <LayoutFont>
      <Component {...pageProps} />
    </LayoutFont>
  );
}
