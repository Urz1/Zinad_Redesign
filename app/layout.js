import './globals.css';
import Script from 'next/script';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';
import { ModalProvider } from '../components/ModalContext';
import { ThemeProvider } from '../components/ThemeContext';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'ZINAD | AI-Powered Human Threat Intelligence & Cybersecurity Platform',
  description: 'ZINAD transforms employees into active cyber sensors with AI-powered phishing simulations, real-time SOAR incident integration, and immersive VR training.',
  keywords: 'cybersecurity awareness, human threat intelligence, phishing simulation, SOAR, Red Teaming, VR training, ReflexAware 360',
  icons: {
    icon: '/assets/images/zinad_emblem.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search).get('theme');var t=(p==='light'||p==='dark')?p:(localStorage.getItem('zinad_theme')||'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <DemoModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
