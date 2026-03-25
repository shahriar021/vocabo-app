import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likes: {}, 
  comments: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      const current = state.likes[postId] || { isLiked: false, count: 0 };
      state.likes[postId] = {
        isLiked: !current.isLiked,
        count: current.isLiked ? current.count - 1 : current.count + 1,
      };
    },
    setCommentCount: (state, action) => {
      const { postId, count } = action.payload;
      state.comments[postId] = count;
    },
  },
});

export const { toggleLike, setCommentCount } = postSlice.actions;
export default postSlice.reducer;
