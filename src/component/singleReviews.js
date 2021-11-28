import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/userContext";
import {
  useDeleteCom,
  useUpdateComments,
  useVoteComment,
} from "../customHook/useComments";
import { useComments, useReviews } from "../customHook/useReviews";

export default function SingleReview() {
  const { reviews_id } = useParams();
  //window.history.pushState(null, null, `/reviews/${reviews_id}/comments`);
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
  const [deleteBtnPressed, setDeleteBtnPressed] = useState(false);
  const [delComment, setDelComment] = useState();
  const { del, setDel } = useDeleteCom({ delComment, deleteBtnPressed });
  useEffect(() => {
    if (del) {
      setDel();
      const newArr = comments.filter((x) => x.comment_id !== +delComment);
      setDeleteBtnPressed(false);
      setComments(newArr);
    }
  }, [del]);
  function handleDelete(e) {
    e.preventDefault();
    setDelComment(e.target.value);
    setDeleteBtnPressed(true);
  }
  // voting comments
  const [voteCommentId, setVoteCommentId] = useState();
  const [voteBtnPressed, setVoteBtnPressed] = useState(false);
  const { vote, setVote } = useVoteComment({ voteCommentId, voteBtnPressed });
  console.log(vote);
  console.log(voteCommentId, voteBtnPressed);
  useEffect(() => {
    if (vote) {
      setVote();
      setVoteBtnPressed(false);
      //setVoteCommentId
    }
  }, [vote]);
  function handleVote(e) {
    e.preventDefault();
    setVoteCommentId(e.target.value);
    setVoteBtnPressed(true);
  }
  console.log(comments);
  if (loading) return <p>Loading...</p>;
  if (err) return <p>error code: {err}</p>;
  if (error) return <p>error code: {error}</p>;
  return (
    <div className="Single">
      <img
        src={`${reviews.review_img_url}`}
        alt="reviewImg"
        className="SinglePicture"
      />{" "}
      <div className="SingleReviewsInfo">
        {Object.keys(reviews).map((x) => (
          <p className="SingleInfo">
            {x}: {reviews[x]}
          </p>
        ))}
      </div>
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
              <div>
                {Object.keys(comment).map((x) => (
                  <p>
                    {x}: {comment[x]}
                  </p>
                ))}
              </div>
              <button
                className="DeleteComment"
                value={comment.comment_id}
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                delete
              </button>
              <button
                className="VoteCommentBtn"
                value={comment.comment_id}
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
