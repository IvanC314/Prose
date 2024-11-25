import HomeHeader from "../Shared_Components/HomeHeader";
import Button from "../Shared_Components/Button";
import './MyReviews.css';

export default function MyReviews() {
  return (
    <div>
      <div className="my-reviews-header">
        <div className="home-header">
          <HomeHeader />
        </div>
        <div className="header-buttons">
          <Button text="Write Review" targetPage="../Write_Review_Page" />
          <Button text="Profile" targetPage="../Account_Page" />
        </div>
      </div>
      <div className="reviews-title-wrapper">
        <h1 className="reviews-title">My Reviews</h1>
      </div>
    </div>
  );
}
