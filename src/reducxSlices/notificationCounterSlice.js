import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const notificationsCounterAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})


const initialState = notificationsCounterAdapter.getInitialState()

export const extendedNotificationsCounterApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getNotificationsCounter : builder.query({
            query:()=> `/counter/load/${(JSON.parse(localStorage.getItem("myInspireAccount")))}`,
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return notificationsCounterAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

      

        unloadNotificationCounter: builder.mutation({
            query: initialPost => ({
                url: `/counter/unload/${(JSON.parse(localStorage.getItem("myInspireAccount")))}`,
                method: 'POST'
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
    useGetNotificationsCounterQuery,
    useUnloadNotificationCounterMutation
}=extendedNotificationsCounterApiSlice

// returns the query result object
export const selectNotificationsResult = extendedNotificationsCounterApiSlice.endpoints.getNotificationsCounter.select()

//creates memoized selector
const selectNotificationsData =createSelector(
    selectNotificationsResult,
    notificationsResult=> notificationsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectNotificationsCounter,
    selectById: selectNotificationsCounterById
    // Pass in a selector that returns the posts slice of state
} = notificationsCounterAdapter.getSelectors(state => selectNotificationsData(state)?? initialState)


