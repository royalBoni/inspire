import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const likesAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = likesAdapter.getInitialState()

export const extendedLikesApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getLikes : builder.query({
            query:()=> `/like`,
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return likesAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        addNewLike: builder.mutation({
            query: ({userID,postID}) => ({
                url: `/like/${userID}/${postID}`,
                method: 'POST'
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        deleteLike: builder.mutation({
            query: ({userID,postID}) => ({
                url: `/like/${userID}/${postID}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),  

  })
})

export const {
    useGetLikesQuery,
    useDeleteLikeMutation,
    useAddNewLikeMutation
}=extendedLikesApiSlice

// returns the query result object
export const selectLkes = extendedLikesApiSlice.endpoints.getLikes.select()

//creates memoized selector
const selectLikesData =createSelector(
    selectLkes,
    likesResult=> likesResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLikes,
    selectById: selectLikeById
    // Pass in a selector that returns the posts slice of state
} = likesAdapter.getSelectors(state => selectLikesData(state)?? initialState)


