import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const bookmarksAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = bookmarksAdapter.getInitialState()

export const extendedBokmarkApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getBookmarks : builder.query({
            query:()=> '/bookmark',
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return bookmarksAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        addNewBookmark: builder.mutation({
            query: ({bookmarkID,userID}) => ({
                url: `/bookmark/${userID}/${bookmarkID}`,
                method: 'POST'
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        deleteBookmark: builder.mutation({
            query: ({bookmarkID,userID}) => ({
                url: `/bookmark/${bookmarkID}/${userID}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useGetBookmarksQuery,
    useAddNewBookmarkMutation,
    useDeleteBookmarkMutation
}=extendedBokmarkApiSlice

// returns the query result object
export const selectBookmarksResult = extendedBokmarkApiSlice.endpoints.getBookmarks.select()

//creates memoized selector
const selectBookmarksData =createSelector(
    selectBookmarksResult,
    bookmarksResult=> bookmarksResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBookmarks,
    selectById: selectBookmarkById
    // Pass in a selector that returns the posts slice of state
} = bookmarksAdapter.getSelectors(state => selectBookmarksData(state)?? initialState)


