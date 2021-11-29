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

  const { reviews, loading, err } = useReviews({ reviews_id });
  const { comments, setComments } = useComments({ reviews_id });
  const [commentInput, setCommentInput] = useState("");
  const { user, users } = useContext(UserContext);

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
  const [invalidDeleteRequest, setInvalidDeleteRequest] = useState(false);
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
  const { vote, setVote, initialVote, setInitialVote } = useVoteComment({
    voteCommentId,
    voteBtnPressed,
  });

  useEffect(() => {
    if (vote) {
      setVote();
      setVoteBtnPressed(false);
    }
  }, [setVote, vote, voteBtnPressed, initialVote, setInitialVote]);
  function handleVote(e) {
    e.preventDefault();
    setInitialVote(initialVote + 1);
    setVoteCommentId(e.target.value);
    setVoteBtnPressed(true);
    setVote();
  }

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
        <h3>{reviews.title}</h3>
        <p className="SingleInfo">Designer: {reviews.designer}</p>
        <p className="SingleInfo">Category: {reviews.category}</p>
        <p className="SingleInfo">Owner: {reviews.owner}</p>
        <p className="SingleInfo">Created at: {reviews.created_at}</p>
        <p className="SingleInfo">Comment count: {reviews.comment_count}</p>
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
      <div className="CommentBoxArea">
        {comments.length === 0 ? (
          <div></div>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="CommentsBox">
              <h3>Comment: {comment.body}</h3>
              <p>Author: {comment.author}</p>
              <img
                src={`${
                  users.filter((x) => x.username === comment.author)[0]
                    .avatar_url
                }`}
                alt="userAvatar"
                className="UserAvatar"
              />
              <p>Vote: {comment.votes + initialVote}</p>
              <p>
                comment id:{comment.comment_id} is created at{" "}
                {comment.created_at}
              </p>

              <button
                className="DeleteComment"
                value={comment.comment_id}
                onClick={(e) => {
                  if (comment.author === user.username) handleDelete(e);
                  else setInvalidDeleteRequest(true);
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
              {invalidDeleteRequest && comment.author !== user.username ? (
                <p className="warning">
                  You have no access to delete someone elses comments
                </p>
              ) : (
                <p></p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
