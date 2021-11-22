import axios from "axios";

const url = axios.create({
  baseURL: "https://learning-experiance-games.herokuapp.com/api",
});

export const getCategories = () => {
  return url.get("/categories").then((res) => res.data);
};

export const getReviews = () => {
  return url.get("/reviews").then((res) => res.data);
};
