import { useEffect, useState } from "react";
import { deleteComment, postComments, updateVote } from "../utils/utils";

const useUpdateComments = ({ reviews_id, comment, pressed }) => {
  const [updateComment, setUpdateComment] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    if (pressed) {
      postComments({ reviews_id, comment })
        .then((res) => {
          setError(null);
          setUpdateComment(res);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    }
  }, [pressed]);
  return { updateComment, error, setUpdateComment };
};

const useDeleteCom = ({ delComment, deleteBtnPressed }) => {
  const [del, setDel] = useState();
  useEffect(() => {
    if (deleteBtnPressed) {
      deleteComment(delComment)
        .then((res) => {
          setDel("done");
        })
        .catch((err) => console.log(err));
    }
  }, [delComment]);
  return { del, setDel };
};

const useVoteComment = ({ voteCommentId, voteBtnPressed }) => {
  const [initialVote, setInitialVote] = useState(0);
  const [vote, setVote] = useState();
  useEffect(() => {
    if (voteBtnPressed) {
      updateVote(voteCommentId)
        .then((res) => setVote(res))
        .catch((err) => console.log(err));
    }
  }, [voteCommentId, voteBtnPressed]);

  return { vote, setVote, initialVote, setInitialVote };
};
export { useUpdateComments, useDeleteCom, useVoteComment };
