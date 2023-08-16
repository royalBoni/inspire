import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../reducxSlices/api";
import myStatesReducer from "../reducxSlices/actionStateSlice";

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        myStates:myStatesReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
    
})