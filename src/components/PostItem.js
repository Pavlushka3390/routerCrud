import React from "react";
import Post from "./Post";

const PostItem = ({ data }) => (
  <div className="card mb-3">
    <ul className="post-item list-group list-group-flush">
      <Post data={data} showCommentInput={true} />
    </ul>
  </div>
);

PostItem.propTypes = {
  data: Post.propTypes.data
};

export default PostItem;