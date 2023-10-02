import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import postModalReducer from './postModalSlice'
import filteredPostsReducer from './filteredPostSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    postModal: postModalReducer,
    filteredPosts: filteredPostsReducer,
  },
})

export default store
