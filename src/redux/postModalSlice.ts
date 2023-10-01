import { createSlice } from '@reduxjs/toolkit'
import { Post } from '../types'

const initialState: Post | null = null

const postModalSlice = createSlice({
  name: 'postModal',
  initialState,
  reducers: {
    setPostModal: (state, action) => {
      return action.payload
    },
  },
})

export const { setPostModal } = postModalSlice.actions
export default postModalSlice.reducer
