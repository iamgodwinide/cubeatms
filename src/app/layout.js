import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Figtree } from 'next/font/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const FigtreeFont = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: "Cube ATMs"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></Script>
      <Script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></Script>
      </head>
      <body
        className={`${FigtreeFont.className} ${geistSans.variable} ${geistMono.variable } antialiased`}
      >
        {children}
        <Script src="//code.jivosite.com/widget/9eQhtzTJPt" async></Script>
      </body>
    </html>
  );
}
