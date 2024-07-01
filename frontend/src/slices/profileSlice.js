import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '@/config/axiosConfig'

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const getUserDetails = createAsyncThunk('profile/getUserDetails', async () => {
    const response = await axios.post('http://localhost:3001/api/v1/user/profile')
    return response.data.body
})

export const updateUserDetails = createAsyncThunk('profile/updateUserDetails', async (credentials) => {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', credentials)
    return response.data.body
})


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateUserDetails.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer