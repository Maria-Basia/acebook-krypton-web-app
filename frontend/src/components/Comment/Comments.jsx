import React, { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { LikeCommentButton } from "../Like/Like";
import CreateComment from "./CreateComment";
import "./Comments.css";

const Comments = ({ postId, userId }) => {
  const [commentData, setCommentData] = useState([]);

  const fetchComments = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getComments(postId, token) // Fetch comments for the specific post
        .then((data) => {
          console.log("Received comment data:", data);
          setCommentData(data.comments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return day + "st";
    if (day === 2 || day === 22) return day + "nd";
    if (day === 3 || day === 23) return day + "rd";
    return day + "th";
  };

  return (
    <div>
      <div className="create-comment">
        <CreateComment postId={postId} updateCommentFeed={fetchComments} />
      </div>
      <div>
        {commentData.map((comment) => {
          const date = new Date(comment.createdAt);
          const day = addOrdinalSuffix(date.getDate());
          const month = date.toLocaleString("en-GB", { month: "short" });
          const time = date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          });

          const formattedDate = `${day} ${month} ${date.getFullYear()} at ${time}`;

          return (
            <div className="comment-container" key={comment._id}>
              <div className="comment-content">
                <div className="comment-user">
                  <img
                    className="comment-profilePicture"
                    src={comment.user.profilePicture}
                  />
                  <div className="comment-date-and-name">
                    <div className="comment-fullName">
                      {comment.user.fullName}
                    </div>
                    <div className="comment-date">{formattedDate}</div>
                  </div>
                </div>
                <div className="comment-text">{comment.comment_text}</div>
                <div className="comment-like-button">
                  <LikeCommentButton
                    commentId={comment._id}
                    userId={userId}
                    isLiked={comment.liked}
                    updateCommentLikeFeed={fetchComments}
                  />
                </div>
                <div className="comment-like-count">
                  {comment.likedBy.length}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
