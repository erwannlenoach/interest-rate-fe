import { Inter } from 'next/font/google';
import Footer from '../app/components/footer/page';
import Header from '../app/components/header/page';
import './globals.css';
import { AuthProvider } from './context/AuthContext'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nostra',
  description: 'AI-powered Transfer pricing application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <AuthProvider> {}
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
