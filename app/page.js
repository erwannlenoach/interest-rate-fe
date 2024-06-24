import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import HomeScreen from '@/app/home/page';
import { AuthProvider } from './context/AuthContext';



export default function Home({ HomeScreen, pageProps }) {
  return (
    <AuthProvider>
      <HomeScreen {...pageProps} />
    </AuthProvider>
  );
}

