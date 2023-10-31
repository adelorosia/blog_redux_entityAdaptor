import axios from "axios";
import { IArticle } from "../interface";

const SERVER_URL = "http://localhost:8001/api";

export const getAllBlogs = () => {
  const url = `${SERVER_URL}/blog/display`;
  return axios.get(url);
};

export const getAllUsers = () => {
  const url = `${SERVER_URL}/user/display`;
  return axios.get(url);
};

export const createBlogs = (blog: IArticle) => {
  const url = `${SERVER_URL}/blog/create`;
  return axios.post(url,blog);
};
