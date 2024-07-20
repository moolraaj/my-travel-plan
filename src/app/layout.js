// import { Jost } from "next/font/google";
import "./globals.css";
import './css/style.scss'

import Layout from "./_common/layout/layout";

// const Jost12 = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
        {children}
        </Layout>
        </body>
    </html>
  );
}
