import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

// API to get posts
export const getPublishedPosts = (page) => {
  return axios.get(`${api}/posts/published/page/${page}`);
};

// API to get post
export const getPost = (slug) => {
  return axios.get(`${api}/posts/${slug}`);
};

// API to get post comments
export const getPostComments = (postId, page) => {
  return axios.get(`${api}/posts/${postId}/comments/published/page/${page}`);
};

// API to create comments
export const createComment = (slug, body, token) => {
  return axios.post(`${api}/posts/${slug}/comment`, body, {
    headers: { Authorization: token },
  });
};

// API to update comments
export const updateComment = (slug, commentId, body, token) => {
  return axios.put(`${api}/posts/${slug}/comment/${commentId}`, body, {
    headers: { Authorization: token },
  });
};

// API to delete comments
export const deleteComment = (slug, commentId, token) => {
  return axios.delete(`${api}/posts/${slug}/comment/${commentId}`, {
    headers: { Authorization: token },
  });
};

// Api to post register
export const registerVisitor = (data) => {
  return axios.post(`${api}/auth/register`, data);
};

// API to get me
export const me = (token) => {
  return axios.get(`${api}/auth/me`, {
    headers: { Authorization: token },
  });
};

// API to post login
export const login = (data) => {
  return axios.post(`${api}/auth/login`, data);
};

// API to request to editor
export const requestEditor = () => {
  return axios.post(`${api}/requests`);
};
