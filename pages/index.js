import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import Header from '@/app/components/header';
import LoanForm from '@/app/components/form';
import Footer from '@/app/components/footer';


export default function Home() {
  return (
    <div className="uk-container uk-margin-top">
        <Header/>
        <LoanForm/>
        <Footer/>
    </div>
  );
}


