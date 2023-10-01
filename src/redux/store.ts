import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import postModalReducer from './postModalSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    postModal: postModalReducer,
  },
})

export default store
