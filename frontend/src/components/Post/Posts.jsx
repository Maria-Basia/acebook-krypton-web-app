import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { LikePostButton } from "../Like/Like";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import Comments from "../Comment/Comments";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("userId");

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return day + "st";
    if (day === 2 || day === 22) return day + "nd";
    if (day === 3 || day === 23) return day + "rd";
    return day + "th";
  };

  return (
    <>
      <div className="createpost">
        <CreatePost updatePostFeed={fetchPosts} />
      </div>
      <div>
        {posts.map((post) => {
          const date = new Date(post.createdAt);
          const day = addOrdinalSuffix(date.getDate());
          const month = date.toLocaleString("en-GB", { month: "short" });
          const time = date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          });

          const formattedDate = `${day} ${month} ${date.getFullYear()} at ${time}`;

          return (
            <div className="post" key={post._id}>
              <div className="post-border">
                <div className="post-header-container">
                  <img
                    className="post-profile_picture"
                    src={post.user.profilePicture}
                    alt="Profile"
                  />
                  <div>
                    <div className="post-user-fullName">
                      {post.user.fullName}
                    </div>
                    <div className="post-date">{formattedDate}</div>
                  </div>
                </div>
                {post.image && (
                  <img className="post_image" src={post.image} alt="Post" />
                )}
                <div className="post-message">{post.message}</div>
                <div className="post-like-button">
                  <LikePostButton
                    postId={post._id}
                    isLiked={post.likedBy.includes(loggedInUser)}
                    updatePostLikeFeed={fetchPosts}
                  />
                </div>
                <div className="post-like-counter">{post.likedBy.length}</div>
              </div>
              <div>
                <Comments postId={post._id} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Posts;
