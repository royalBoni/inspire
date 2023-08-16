import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const inspirationsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = inspirationsAdapter.getInitialState()

export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getInspirations : builder.query({
            query:()=> '/inspiration',
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return inspirationsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return inspirationsAdapter.setAll(initialState, loadedPosts)
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
        }),

  })
})

export const {
    useGetInspirationsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
}=extendedApiSlice

// returns the query result object
export const selectInspirationsResult = extendedApiSlice.endpoints.getInspirations.select()

//creates memoized selector
const selectInspirationsData =createSelector(
    selectInspirationsResult,
    inspirationsResult=> inspirationsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInspirations,
    selectById: selectInspirationById,
    selectIds: selectInspirationIds
    // Pass in a selector that returns the posts slice of state
} = inspirationsAdapter.getSelectors(state => selectInspirationsData(state)?? initialState)


