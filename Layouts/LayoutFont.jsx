import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "400", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutFont({ children }) {
  return <div className={roboto.className}>{children}</div>;
}
