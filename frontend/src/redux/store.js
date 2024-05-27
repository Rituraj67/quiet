import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login'
import loadingReducer from './loading'
import userReduser from './user'
import postReducer from './Post'


export const store = configureStore({
  reducer: {
    login: loginReducer,
    loading: loadingReducer,
    user: userReduser,
    post: postReducer,
  },
})
