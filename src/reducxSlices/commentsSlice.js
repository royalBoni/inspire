import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const commentsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = commentsAdapter.getInitialState()

export const extendedCommentsApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getComments : builder.query({
            query:()=> '/comment',
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return commentsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),
         
        addNewComment: builder.mutation({
            query: initialPost => ({
                url: `comment/${initialPost.userID}/${initialPost.id}`,
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        /*
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
    useGetCommentsQuery,
    useAddNewCommentMutation
}=extendedCommentsApiSlice

// returns the query result object
export const selectCommentsResult = extendedCommentsApiSlice.endpoints.getComments.select()

//creates memoized selector
const selectCommentsData =createSelector(
    selectCommentsResult,
    commentsResult=> commentsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllComments,
    selectById: selectCommentById
    // Pass in a selector that returns the posts slice of state
} = commentsAdapter.getSelectors(state => selectCommentsData(state)?? initialState)


