import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const profilesAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = profilesAdapter.getInitialState()

export const extendedProfilesApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getProfiles : builder.query({
            query:()=> '/account-profiles',
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return profilesAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        /* getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return profilesAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),

        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/dishes',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/dishes`,
                method: 'PUT',
                body: initialPost
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        deletePost: builder.mutation({
            query: ({dishID,adminID}) => ({
                url: `/dishes/${dishID}/${adminID}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }), */

  })
})

export const {
    useGetProfilesQuery,
}=extendedProfilesApiSlice

// returns the query result object
export const selectProfilesResult = extendedProfilesApiSlice.endpoints.getProfiles.select()

//creates memoized selector
const selectProfilesData =createSelector(
    selectProfilesResult,
    profilesResult=> profilesResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfileById
    // Pass in a selector that returns the posts slice of state
} = profilesAdapter.getSelectors(state => selectProfilesData(state)?? initialState)


