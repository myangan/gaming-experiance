import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/userContext";
import { useDeleteCom, useUpdateComments } from "../customHook/useComments";
import { useComments, useReviews } from "../customHook/useReviews";

export default function SingleReview() {
  const { reviews_id } = useParams();
  window.history.pushState(null, null, `/reviews/${reviews_id}/comments`);
  const { reviews, loading, err } = useReviews({ reviews_id });
  const { comments, setComments } = useComments({ reviews_id });
  const [commentInput, setCommentInput] = useState("");
  const { user } = useContext(UserContext);

  // update comment
  const [pressed, setPressed] = useState(false);
  const comment = { username: user.username, body: commentInput };
  const { updateComment, error, setUpdateComment } = useUpdateComments({
    reviews_id,
    comment,
    pressed,
  });
  useEffect(() => {
    if (Object.keys(updateComment).length) {
      setPressed(false);
      setUpdateComment({});
      setComments([...comments, updateComment]);
    }
  }, [updateComment]);
  function handleSubmit(e) {
    e.preventDefault();
    setPressed(true);
  }
  // delete comment
  const [deleteBtnPressed, setDeleteBtnPressed] = useState("");
  const { del } = useDeleteCom(deleteBtnPressed);

  useEffect(() => {
    console.log(deleteBtnPressed);
    if (deleteBtnPressed !== "") {
      const newArr = comments.filter((x) => x.comment_id !== deleteBtnPressed);
      setDeleteBtnPressed("");
      setComments(newArr);
    }
  }, [del]);
  function handleDelete(e) {
    e.preventDefault();
    setDeleteBtnPressed(e.target.value);
  }
  // voting comments
  function handleVote() {}

  if (loading) return <p>Loading...</p>;
  if (err) return <p>error code: {err}</p>;
  if (error) return <p>error code: {error}</p>;
  return (
    <div className="Single">
      <img
        src={`${reviews.review_img_url}`}
        alt="reviewImg"
        className="SinglePicture"
      />
      <p className="SingleInfo">{reviews.reviews_id}</p>
      <p className="SingleInfo">{reviews.title}</p>
      <p className="SingleInfo">{reviews.designer} </p>
      <p className="SingleInfo">{reviews.votes}</p>
      <p className="SingleInfo">{reviews.category}</p>
      <p className="SingleInfo">{reviews.comment_count}</p>
      <p className="SingleInfo">{reviews.crated_at}</p>
      <p className="SingleInfo">{reviews.owner}</p>
      <div className="commentArea">
        <textarea
          cols="40"
          rows="5"
          className="CommentInput"
          type="text"
          name="comment"
          id="comment"
          value={commentInput}
          onChange={(event) => {
            setCommentInput(event.target.value);
          }}
        ></textarea>
        <button
          className="commentBtn"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Comment
        </button>
      </div>

      <div>
        {comments.length === 0 ? (
          <div></div>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="CommentsBox">
              <p className="CommentBody">Comment: {comment.body}</p>
              <p className="CommentsDesigner">Designer:{comment.designer}</p>
              <button
                className="DeleteComment"
                value={comment.comment_id}
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                delete
              </button>
              <p className="VoteComment">{comment.votes}</p>
              <button
                className="VoteCommentBtn"
                onClick={(e) => {
                  handleVote(e);
                }}
              >
                Vote
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
