import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";
import episodesReducer from "./episodesSlice";

const store = configureStore ({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer,
    }
})

export default store;