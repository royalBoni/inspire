import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const notificationsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = notificationsAdapter.getInitialState()

export const extendedNotificationsApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getNotifications : builder.query({
            query:()=> `/notification/${(JSON.parse(localStorage.getItem("myInspireAccount")))}`,
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return notificationsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        addNewNotification: builder.mutation({
            query: initialPost => ({
                url: `/notification/${initialPost.userID}/${initialPost.authorID}`,
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),


        deleteNotification: builder.mutation({
            query: ({notificationId}) => ({
                url: `/notification/${notificationId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }), 

  })
})

export const {
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
    useAddNewNotificationMutation
}=extendedNotificationsApiSlice

// returns the query result object
export const selectNotificationsResult = extendedNotificationsApiSlice.endpoints.getNotifications.select()

//creates memoized selector
const selectNotificationsData =createSelector(
    selectNotificationsResult,
    notificationsResult=> notificationsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectNotifications,
    selectById: selectNotificationsById
    // Pass in a selector that returns the posts slice of state
} = notificationsAdapter.getSelectors(state => selectNotificationsData(state)?? initialState)


