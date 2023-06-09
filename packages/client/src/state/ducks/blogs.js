import { createSlice } from '@reduxjs/toolkit';

import {
  getPublishedPosts,
  getPost,
  getPostComments,
  getPublishedCategoryPosts,
} from '../../api';

function startLoading(state) {
  state.loading = true;
}

function loadingFailed(state, { payload }) {
  state.loading = false;
  state.error = payload;
}

const blogsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {
    getBlogsStart: startLoading,

    getBlogsSuccess: (state, { payload }) => {
      return {
        loading: false,
        error: null,
        data: payload,
      };
    },

    getBlogsFailure: loadingFailed,
  },
});

const blogSlice = createSlice({
  name: 'post',
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {
    getBlogStart: startLoading,

    getBlogSuccess: (state, { payload }) => {
      return {
        loading: false,
        error: null,
        data: payload,
      };
    },

    getBlogFailure: loadingFailed,
  },
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {
    getCommentsStart: startLoading,

    getCommentsSuccess: (state, { payload }) => {
      return {
        loading: false,
        error: null,
        data: payload,
      };
    },

    getCommentsFailure: loadingFailed,
  },
});

const searchSlice = createSlice({
  name: 'search',
  initialState: null,
  reducers: {
    getSearchStart: startLoading,

    setSearchString: (state, { payload }) => {
      return payload;
    },
  },
});

const guestPostSlice = createSlice({
  name: 'guestPost',
  initialState: {
    modal: false,
  },
  reducers: {
    toggleGuestPostModal: (state, { payload }) => {
      return {
        modal: !state.modal,
      };
    },
  },
});

export const {
  getBlogsStart,
  getBlogsSuccess,
  getBlogsFailure,
} = blogsSlice.actions;

export const {
  getBlogStart,
  getBlogSuccess,
  getBlogFailure,
} = blogSlice.actions;

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
} = commentsSlice.actions;

export const { setSearchString } = searchSlice.actions;
export const { toggleGuestPostModal } = guestPostSlice.actions;

export default {
  blogs: blogsSlice.reducer,
  blog: blogSlice.reducer,
  comments: commentsSlice.reducer,
  search: searchSlice.reducer,
  guestPost: guestPostSlice.reducer,
};

export const fetchBlogs = (page) => async (dispatch) => {
  try {
    dispatch(getBlogsStart());

    const { data } = await getPublishedPosts(page);

    dispatch(getBlogsSuccess(data));
  } catch (error) {
    dispatch(getBlogsFailure(error.toString()));
  }
};

export const fetchCategoryPosts = (slug, page) => async (dispatch) => {
  try {
    dispatch(getBlogsStart());

    const { data } = await getPublishedCategoryPosts(slug, page);

    dispatch(getBlogsSuccess(data));
  } catch (error) {
    dispatch(getBlogsFailure(error.toString()));
  }
};

export const fetchBlog = (slug) => async (dispatch) => {
  try {
    dispatch(getBlogStart());

    const { data } = await getPost(slug);

    dispatch(getBlogSuccess(data));
  } catch (error) {
    dispatch(getBlogFailure(error.toString()));
  }
};

export const fetchComments = (id, page) => async (dispatch) => {
  try {
    dispatch(getCommentsStart());

    const { data } = await getPostComments(id, page);

    dispatch(getCommentsSuccess(data));
  } catch (error) {
    dispatch(getCommentsFailure(error.toString()));
  }
};
