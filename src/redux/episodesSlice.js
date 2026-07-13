import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk("episodes/fetchEpisodes", 

    async(page) => {
        const response = await axios.get(`https://thesimpsonsapi.com/api/episodes?page=${page}`);
        return response.data.results || [];
    }
)

const episodesSlice = createSlice({
    name: "episodes",
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default episodesSlice.reducer;