import Header from './Home_Page/Header';
import Reviews from './Home_Page/Reviews';
// import { useAuth } from './providers/AuthContext'; // Commented out for debugging

export default function Home() {
  // const { isLoggedIn } = useAuth(); // Access the auth state (commented out for debugging)

  // Log rendering for debugging purposes
  // console.log("Rendering the /Home_Page route. isLoggedIn:", isLoggedIn);

  return (
    <div>
      {/* Use the isLoggedIn state to force remounting of the Header component */}
      <Header /* key={isLoggedIn ? "loggedIn" : "loggedOut"} */ />
      <Reviews />
    </div>
  );
}
