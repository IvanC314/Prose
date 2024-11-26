// "use client";
// import React, { useState } from "react";
// import "./Account.css";
// import Link from "next/link";
// import { monsieurClass } from "../styles/fontSwitcher";
// import { useAuth } from "../AuthContext";

// interface AccountProps {
//   profileImage: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// export default function Account({
//   profileImage,
//   username,
//   firstName,
//   lastName,
//   email,
// }: AccountProps) {
//   const [currentImage, setCurrentImage] = useState(profileImage);
//   const { exquisiteToggle, toggleExquisiteMode } = useAuth(); // Access AuthContext

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setCurrentImage(imageUrl);
//     }
//   };

//   return (
//     <div className="account-page">
//       <div className="account-container">
//         <img src={currentImage} alt="Profile" className="profile-image" />

//         <h1 className="account-title">Account Details</h1>

//         <div className="account-info">
//           <p><strong>Username:</strong> {username}</p>
//           <p><strong>First Name:</strong> {firstName}</p>
//           <p><strong>Last Name:</strong> {lastName}</p>
//           <p><strong>Email:</strong> {email}</p>
//         </div>

//         <div className="account-buttons">
//           <label htmlFor="profile-image-upload" className="change-picture-button">
//             Change Profile Picture
//           </label>
//           <input
//             id="profile-image-upload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ display: "none" }}
//           />

//           <button className="change-button">Change Username</button>
//           <button className="change-button">Change Password</button>
//           <button className="change-button">
//             <Link href="../My_Reviews_Page">My Reviews</Link>
//           </button>
//           <button
//             className={`change-button ${monsieurClass}`}
//             onClick={toggleExquisiteMode}
//           >
//             {exquisiteToggle ? "Disable Exquisite Mode" : "Enable Exquisite Mode"}
//           </button>

//           <button className="change-button account-logout-button">Logout</button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import "./Account.css";
import Link from "next/link";
import { monsieurClass } from "../styles/fontSwitcher"; 
import { useAuth } from "../AuthContext";

interface AccountProps {
  profileImage: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Account({
  profileImage,
  username,
  firstName,
  lastName,
  email,
}: AccountProps) {
  const [currentImage, setCurrentImage] = useState(profileImage);
  const { exquisiteToggle, toggleExquisiteMode } = useAuth(); // Access AuthContext

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentImage(imageUrl);
    }
  };

  const fontClass = exquisiteToggle ? monsieurClass : '';

  return (
    <div className="account-page">
      <div className="account-container">
        <img src={currentImage} alt="Profile" className={`profile-image ${fontClass}`} />

        <h1 className={`account-title ${fontClass}`}>Account Details</h1>

        <div className={`account-info ${fontClass}`}>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        <div className="account-buttons">
          <label htmlFor="profile-image-upload" className={`change-picture-button ${fontClass}`}>
            Change Profile Picture
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button className={`change-button ${fontClass}`}>Change Username</button>
          <button className={`change-button ${fontClass}`}>Change Password</button>
          <button className={`change-button ${fontClass}`}>
            <Link href="../My_Reviews_Page">My Reviews</Link>
          </button>


          <button className={`change-button account-logout-button ${fontClass}`}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
