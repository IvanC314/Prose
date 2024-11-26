// "use client";
// import React, { useState } from "react";
// import "./WriteReview.css";
// import Button from "../Shared_Components/Button";

// interface BookSuggestion {
//   title: string;
//   author_name?: string[]; 
//   isbn?: string[]; 
//   key?: string; 
// }

// export default function WriteReview() {
//   const [formData, setFormData] = useState({
//     title: "",
//     imageUrl: "",
//     author: "",
//     description: "",
//     reviewTitle: "",
//     stars: "",
//     review: "",
//   });

//   const [suggestions, setSuggestions] = useState<BookSuggestion[]>([]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));

//     if (id === "title" && value.length > 2) {
//       fetchBookSuggestions(value);
//     } else if (id === "title" && value.length <= 2) {
//       setSuggestions([]);
//     }
//   };

//   const fetchBookSuggestions = async (searchTerm: string) => {
//     try {
//       const response = await fetch(
//         `https://openlibrary.org/search.json?title=${searchTerm}`
//       );
//       const data = await response.json();
//       setSuggestions(data.docs.slice(0, 5));
//     } catch (error) {
//       console.error("Error fetching book suggestions:", error);
//     }
//   };

//   const fetchBookDescription = async (workKey: string | undefined) => {
//     if (!workKey) return "No description available.";

//     try {
//       const response = await fetch(`https://openlibrary.org${workKey}.json`);
//       const data = await response.json();
//       return data.description?.value || "No description available."; 
//     } catch (error) {
//       console.error("Error fetching book description:", error);
//       return "Error fetching description.";
//     }
//   };

//   const handleSuggestionClick = async (book: BookSuggestion) => {
//     const description = await fetchBookDescription(book.key); 

//     setFormData((prevData) => ({
//       ...prevData,
//       title: book.title,
//       author: book.author_name ? book.author_name.join(", ") : "Unknown",
//       imageUrl: book.isbn
//         ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
//         : "",
//       description, 
//     }));
//     setSuggestions([]);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     const reviewData = {
//       title: formData.reviewTitle,
//       rating: parseInt(formData.stars, 10),
//       desc: formData.review,
//       book: {
//         title: formData.title,
//         author: formData.author,
//         genre: ["Example Genre"],
//         desc: formData.review,
//         img_url: formData.imageUrl,
//       },
//     };

//     if (!reviewData.title || !reviewData.rating || isNaN(reviewData.rating)) {
//       console.error("Review title and a valid numeric rating are required.");
//       return;
//     }

//     if (reviewData.rating < 1 || reviewData.rating > 5) {
//       console.error("Rating must be between 1 and 5.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/reviews", {
//         method: "POST",
//         body: JSON.stringify(reviewData),
//       });

//       if (response.ok) {
//         console.log("Review and book posted successfully!");
//         setFormData({
//           title: "",
//           imageUrl: "",
//           author: "",
//           description: "",
//           reviewTitle: "",
//           stars: "",
//           review: "",
//         });
//       } else {
//         console.error("Failed to post review:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error while posting review:", error);
//     }
//   };

//   return (
//     <div className="book-background">
//       <form
//         className="page-container"
//         onSubmit={handleSubmit}
//         onKeyDown={handleKeyDown}
//       >
//         <div className="form-section left-section">
//           <label htmlFor="title" className="textboxLabel">
//             Title:
//           </label>
//           <input
//             type="text"
//             id="title"
//             className="textboxReview"
//             placeholder="Enter Book Title"
//             value={formData.title}
//             onChange={handleChange}
//           />

//           {suggestions.length > 0 && (
//             <ul className="suggestions-dropdown">
//               {suggestions.map((book, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSuggestionClick(book)}
//                   className="suggestion-item"
//                 >
//                   {book.title} -{" "}
//                   {book.author_name ? book.author_name.join(", ") : "Unknown"}
//                 </li>
//               ))}
//             </ul>
//           )}

//             {formData.imageUrl && (
//                 <div className="image-preview">
//                 <img
//                     src={formData.imageUrl}
//                     alt="Book Cover"
//                     className="preview-image"
//                 />
//                 </div>
//             )}

//           <label htmlFor="author" className="textboxLabel">
//             Author:
//           </label>
//           <input
//             type="text"
//             id="author"
//             className="textboxReview"
//             placeholder="Author will appear here..."
//             value={formData.author}
//             onChange={handleChange}
//           />

//           <label htmlFor="description" className="textboxLabel">
//             Book Description:
//           </label>
//           <textarea
//             id="description"
//             className="textboxReview review-box"
//             placeholder="Book description will appear here..."
//             value={formData.description}
//             readOnly
//           ></textarea>
//         </div>

//         <div className="form-section right-section">
//           <label htmlFor="reviewTitle" className="textboxLabel">
//             Review Title:
//           </label>
//           <input
//             type="text"
//             id="reviewTitle"
//             className="textboxReview"
//             placeholder="Enter Review Title"
//             value={formData.reviewTitle}
//             onChange={handleChange}
//           />

//           <label htmlFor="stars" className="textboxLabel">
//             Stars:
//           </label>
//           <input
//             type="number"
//             id="stars"
//             className="textboxReview"
//             placeholder="Stars..."
//             value={formData.stars}
//             onChange={handleChange}
//             max="5"
//             min="1"
//           />

//           <label htmlFor="review" className="textboxLabel">
//             Write Review:
//           </label>
//           <textarea
//             id="review"
//             className="textboxReview review-box-user"
//             placeholder="Write your review here..."
//             value={formData.review}
//             onChange={handleChange}
//           ></textarea>

//           <Button text="Post Review"/>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import "./WriteReview.css";
import Button from "../Shared_Components/Button";
import { useAuth } from "@/app/AuthContext";

interface BookSuggestion {
  title: string;
  author_name?: string[];
  isbn?: string[];
  key?: string;
}

export default function WriteReview() {
  const { user_id, isLoggedIn } = useAuth();  // Destructure user_id and isLoggedIn

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    author: "",
    description: "",
    reviewTitle: "",
    stars: "",
    review: "",
  });

  const [suggestions, setSuggestions] = useState<BookSuggestion[]>([]);

  // Handle changes to form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "title" && value.length > 2) {
      fetchBookSuggestions(value);
    } else if (id === "title" && value.length <= 2) {
      setSuggestions([]);
    }
  };

  // Fetch book suggestions from Open Library API based on the title
  const fetchBookSuggestions = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      );
      const data = await response.json();
      setSuggestions(data.docs.slice(0, 5));
    } catch (error) {
      console.error("Error fetching book suggestions:", error);
    }
  };

  // Fetch book description from Open Library API using the work key
  const fetchBookDescription = async (workKey: string | undefined) => {
    if (!workKey) return "No description available.";

    try {
      const response = await fetch(`https://openlibrary.org${workKey}.json`);
      const data = await response.json();
      return data.description?.value || "No description available.";
    } catch (error) {
      console.error("Error fetching book description:", error);
      return "Error fetching description.";
    }
  };

  // Handle book suggestion click
  const handleSuggestionClick = async (book: BookSuggestion) => {
    const description = await fetchBookDescription(book.key);

    setFormData((prevData) => ({
      ...prevData,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      imageUrl: book.isbn
        ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
        : "",
      description,
    }));
    setSuggestions([]);
  };

  // Prevent form submission on "Enter" key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const reviewData = {
      title: formData.reviewTitle,
      rating: parseInt(formData.stars, 10),
      desc: formData.review,
      user_id, // Add user_id here
      book: {
        title: formData.title,
        author: formData.author,
        genre: ["Example Genre"], // You can replace this with actual genre
        desc: formData.description,
        img_url: formData.imageUrl,
      },
    };

    if (!reviewData.title || !reviewData.rating || isNaN(reviewData.rating)) {
      console.error("Review title and a valid numeric rating are required.");
      return;
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      console.error("Rating must be between 1 and 5.");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Review and book posted successfully!");
        setFormData({
          title: "",
          imageUrl: "",
          author: "",
          description: "",
          reviewTitle: "",
          stars: "",
          review: "",
        });
      } else {
        console.error("Failed to post review:", await response.json());
      }
    } catch (error) {
      console.error("Error while posting review:", error);
    }
  };

  return (
    <div className="book-background">
      <form
        className="page-container"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <div className="form-section left-section">
          <label htmlFor="title" className="textboxLabel">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="textboxReview"
            placeholder="Enter Book Title"
            value={formData.title}
            onChange={handleChange}
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((book, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(book)}
                  className="suggestion-item"
                >
                  {book.title} -{" "}
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </li>
              ))}
            </ul>
          )}

          {formData.imageUrl && (
            <div className="image-preview">
              <img
                src={formData.imageUrl}
                alt="Book Cover"
                className="preview-image"
              />
            </div>
          )}

          <label htmlFor="author" className="textboxLabel">
            Author:
          </label>
          <input
            type="text"
            id="author"
            className="textboxReview"
            placeholder="Author will appear here..."
            value={formData.author}
            onChange={handleChange}
          />

          <label htmlFor="description" className="textboxLabel">
            Book Description:
          </label>
          <textarea
            id="description"
            className="textboxReview review-box"
            placeholder="Book description will appear here..."
            value={formData.description}
            readOnly
          ></textarea>
        </div>

        <div className="form-section right-section">
          <label htmlFor="reviewTitle" className="textboxLabel">
            Review Title:
          </label>
          <input
            type="text"
            id="reviewTitle"
            className="textboxReview"
            placeholder="Enter Review Title"
            value={formData.reviewTitle}
            onChange={handleChange}
          />

          <label htmlFor="stars" className="textboxLabel">
            Stars:
          </label>
          <input
            type="number"
            id="stars"
            className="textboxReview"
            placeholder="Stars..."
            value={formData.stars}
            onChange={handleChange}
            max="5"
            min="1"
          />

          <label htmlFor="review" className="textboxLabel">
            Write Review:
          </label>
          <textarea
            id="review"
            className="textboxReview review-box-user"
            placeholder="Write your review here..."
            value={formData.review}
            onChange={handleChange}
          ></textarea>

          <Button text="Post Review" />
        </div>
      </form>
    </div>
  );
}
