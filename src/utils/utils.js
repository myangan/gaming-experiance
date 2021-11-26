import axios from "axios";

const url = axios.create({
  baseURL: "https://learning-experiance-games.herokuapp.com/api",
});

export const getCategories = () => {
  return url.get("/categories").then((res) => res.data);
};

export const getReviews = ({ categories, reviews_id }) => {
  let path = "/reviews";

  if (categories) path += `?category=${categories}`;
  if (reviews_id) path += `/${reviews_id}`;
  return url.get(path).then((res) => res.data);
};

export const getComments = ({ reviews_id }) => {
  return url.get(`/reviews/${reviews_id}/comments`).then((res) => res.data);
};

export const getUsers = () => {
  return url.get(`/users`).then((res) => res.data);
};
export const getUserDetails = (user) => {
  return url.get(`/users/${user}`).then((res) => res.data.usernames[0]);
};
export const postComments = ({ reviews_id, comment }) => {
  console.log(reviews_id, comment);
  return url
    .post(`/reviews/${reviews_id}/comments`, comment)
    .then((res) => res.data);
};
export const deleteComment = (commentId) => {
  return url.delete(`/comments/${commentId}`).then((res) => res.data);
};

export const updateVote = (commentId) => {
  return url.patch(`/comments/${commentId}`, 1).then((res) => {
    console.log(res.data.votes);
    return res.data;
  });
};
