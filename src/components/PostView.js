import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "./ProfileContext";
import Post from "./Post";

const PostView = ({ data }) => {
  const { profile } = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/posts/${data.id}/edit`, {
    state: { ...data }
  });

  const complete = () => {
    setLoading(false);
    navigate("/", { replace: true });
  };

  const handleDelete = () => {
    setLoading(true);
    window.fetch([process.env.REACT_APP_SERVER_URL, "posts", data.id].join("/"), {
      method: "DELETE"
    }).then(response => response.ok ? complete() : (async () => {
      throw new Error(`Error! status: ${response.status}`)
    })())
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  };

  const handleClose = () => navigate("/");

  const buttons = (profile.id === data?.author?.id) ? (
    <div className="card-footer d-flex justify-content-end">
      {error && (
        <span className="form-control bg-transparent border-0 text-danger">{error}!</span>
      )}
      <button className="btn btn-primary me-2" onClick={handleEdit} disabled={loading}>Изменить</button>
      <button className="btn btn-danger" disabled={loading} onClick={handleDelete}>
        {loading ? (
          <div className="spinner-border spinner-border-sm text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : "Удалить"}
      </button>
    </div>
  ) : null;

  return (
    <div className={`card ${profile.id === data?.author?.id ? "card-fix-height" : ""}`}>
      <div className="modal-btn-close position-absolute" style={{ zIndex: 9 }}>
        <button className="btn-close" onClick={handleClose}></button>
      </div>
      <ul className="list-group list-group-flush">
        <Post data={data} showCommentInput={false} />
      </ul>
      {buttons}
    </div>
  );
};

PostView.propTypes = {
  data: Post.propTypes.data
};

export default PostView;