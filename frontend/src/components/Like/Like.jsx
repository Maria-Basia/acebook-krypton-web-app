// import React, { useState } from "react";
// import { likePost } from "../../services/like";
// import "./Like.css";

// const LikeButton = ({ postId, userId, isLiked, updatePost }) => {
//     const [liked, setLiked] = useState(isLiked);

//     const handleLike = async () => {
//       try {
//         await likePost(postId, userId);
//         setLiked(!liked);
//         updatePost(postId, !liked); // Update the post after like/unlike
//       } catch (error) {
//         console.error("Error liking post:", error);
//       }
//     };

//     return (
//       <button className="like-post" onClick={handleLike}>
//         {liked ? "Unlike" : "Like"}
//       </button>
//     );
//   };

// export default LikeButton

// This whole component is redundant because the like button is being
// incorporated into the Post.jsx file and Comments.jsx file individually
