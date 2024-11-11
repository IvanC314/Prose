import Auth_Header from './Auth_Header';
import Reviews from '../Home_Page/Reviews';

export default function Home() {
  return (
    <div>
        <h1>AUTHENTICATED</h1>
      <Auth_Header/>
      <Reviews/>
    </div>
  );
}
