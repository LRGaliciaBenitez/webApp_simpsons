import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", 

    async (page) => {
        const response = await axios.get(`https://thesimpsonsapi.com/api/characters?page=${page}`);
        return response.data.results || [];
    }
)

export const fetchCharacterById = createAsyncThunk("characters/fetchCharacterById",

    async (id) => {
        const response = await axios.get(`https://thesimpsonsapi.com/api/characters/${id}`)
        return response.data;
    }
)

export const fetchAllCharacters = createAsyncThunk(
    "characters/fetchAllCharacters",
    async () => {

        const firstResponse = await axios.get(
            "https://thesimpsonsapi.com/api/characters?page=1"
        );

        const totalPages = firstResponse.data.pages;

        const requests = [];

        for (let page = 2; page <= totalPages; page++) {
            requests.push(
                axios.get(
                    `https://thesimpsonsapi.com/api/characters?page=${page}`
                )
            );
        }

        const responses = await Promise.all(requests);

        const allCharacters = [
            ...firstResponse.data.results,
            ...responses.flatMap(
                response => response.data.results
            )
        ];

        return allCharacters;
    }
);


const charactersSlice = createSlice({
    name: "characters",
    initialState: {
        results: [],
        allCharacters: [],
        character: null,
        loading: false,
        loadingSearch: false,
        loadingCharacter: false,
        error: null,
        errorCharacter:null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCharacters.pending, (state) => {
                state.loadingSearch = true;
                state.error = null;
            })
            .addCase(fetchCharacterById.pending, (state) => {
                state.loadingCharacter = true;
                state.character = null;
                state.errorCharacter = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action ) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchAllCharacters.fulfilled, (state, action) => {
                state.loadingSearch = false;
                state.allCharacters = action.payload;
            })
            .addCase(fetchCharacterById.fulfilled, (state, action) => {
                state.loadingCharacter = false;
                state.character = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllCharacters.rejected, (state, action) => {
                state.loadingSearch = false;
                state.error = action.error.message;
            })
            .addCase(fetchCharacterById.rejected, (state, action) => {
                state.loadingCharacter = false;
                state.errorCharacter = action.error.message;
            })
    }
})

export default charactersSlice.reducer;