import React from "react";
import "./postCard.css";

const PostCard = ({ title, body }) => {
  return (
    <div className="post-card">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
};

export default PostCard;
