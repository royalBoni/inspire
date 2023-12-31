import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 



export const apiSlice = createApi({
    reducerPath: 'api',  //optional
    /* baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3030'}), */ 
    baseQuery: fetchBaseQuery({baseUrl: 'https://inspire-api.onrender.com'}), //  http://localhost:5000
    tagTypes: ['Post'],
    endpoints: builder =>({})
})
