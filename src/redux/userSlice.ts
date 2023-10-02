import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

const initialState: User[] = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload
    },
  },
})

export const { setUsers } = userSlice.actions

export default userSlice.reducer
