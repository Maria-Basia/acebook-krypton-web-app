import React, { useState } from "react";
import { likePost } from "../../services/like";
import { likeComment } from "../../services/like";
import "./Like.css";

export const LikeCommentButton = ({
  commentId,
  userId,
  isLiked,
  updateCommentLikeFeed,
}) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likeComment(commentId, userId);
      setLiked(!liked);
      updateCommentLikeFeed();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <button className={!liked ? "like" : "unlike"} onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export const LikePostButton = ({
  postId,
  userId,
  isLiked,
  updatePostLikeFeed,
}) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likePost(postId, userId);
      setLiked(!liked);
      updatePostLikeFeed();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button className={!liked ? "like" : "unlike"} onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};
