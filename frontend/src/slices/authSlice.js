import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '@/config/axiosConfig'

const initialState = {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials)
    return response.data.body
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer