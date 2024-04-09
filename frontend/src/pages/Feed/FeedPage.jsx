import React, { useState, useEffect } from "react"; // added
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";

import CreatePost from "../../components/Post/CreatePost";

import Navbar from "../../components/NavBar/Navbar";
import "./FeedPage.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = () => {
    //added
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
  }; //added

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="feed-page">
        <h2>Your feed</h2>
        <div className="createpost" role="feed">
          <CreatePost updatePostFeed={fetchPosts} />
        </div>
        <div className="post_list" role="feed">
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} updatePostFeed={fetchPosts} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
