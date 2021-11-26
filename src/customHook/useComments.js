import { useEffect, useState } from "react";
import { deleteComment, postComments } from "../utils/utils";

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

const useDeleteCom = (commentId) => {
  const [del, setDel] = useState();
  useEffect(() => {
    deleteComment(commentId)
      .then((res) => {
        setDel(res);
      })
      .catch((err) => console.log(err));
  }, [commentId]);
  return { del };
};
export { useUpdateComments, useDeleteCom };
