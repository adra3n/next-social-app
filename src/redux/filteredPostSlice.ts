import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Post } from '../types'

const initialState: Post[] = []

const filteredPostsSlice = createSlice({
  name: 'filteredPosts',
  initialState,
  reducers: {
    setFilteredPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload
    },
  },
})

export const { setFilteredPosts } = filteredPostsSlice.actions
export default filteredPostsSlice.reducer
