import axios from "axios";
import { IArticle, IAuthor } from "../interface";

const SERVER_URL = "http://localhost:8001/api";

export const getAllBlogs = () => {
  const url = `${SERVER_URL}/blog/display`;
  return axios.get(url);
};

export const getAllUsers = () => {
  const url = `${SERVER_URL}/user/display`;
  return axios.get(url);
};

export const createBlog = (blog: IArticle) => {
  const url = `${SERVER_URL}/blog/create`;
  return axios.post(url, blog);
};

export const createUser = (author: IAuthor) => {
  const url = `${SERVER_URL}/user/create`;
  return axios.post(url, author);
};

export const updateBlog = (blog: IArticle, blogId: string) => {
  const url = `${SERVER_URL}/blog/update/${blogId}`;
  return axios.put(url, blog);
};

export const updateUser = (author: IAuthor, authorId: string) => {
  const url = `${SERVER_URL}/user/update/${authorId}`;
  return axios.put(url, author);
};

export const deleteBlog = (blogId: string) => {
  const url = `${SERVER_URL}/blog/delete/${blogId}`;
  return axios.delete(url);
};

export const deleteUser = (authorId: string) => {
  const url = `${SERVER_URL}/user/delete/${authorId}`;
  return axios.delete(url);
};
