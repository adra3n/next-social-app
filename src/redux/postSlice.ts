import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Post, User } from '../types'

const initialState: Post[] = []

const postSlice: any = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload
    },
    //updating post here
    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload
      state = state.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost
        }
        return post
      })
    },
  },
})

export const { setPosts, updatePost } = postSlice.actions
export default postSlice.reducer
