import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const inspirersAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = inspirersAdapter.getInitialState()

export const extendedInspirersApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getInspirers : builder.query({
            query:()=> '/inspirer',
            transformResponse: responseData=>{
                const loadedPosts= responseData
                return inspirersAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        
        addNewInspirer: builder.mutation({
            query: ({userID,item}) => ({
                url: `inspirer/${userID}/${item}`,
                method: 'POST'
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        deleteInspirer: builder.mutation({
            query: ({userID,followID}) => ({
                url: `/inspirer/${userID}/${followID}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useGetInspirersQuery,
    useDeleteInspirerMutation,
    useAddNewInspirerMutation
}=extendedInspirersApiSlice

// returns the query result object
export const selectInspirersResult = extendedInspirersApiSlice.endpoints.getInspirers.select()

//creates memoized selector
const selectInspirersData =createSelector(
    selectInspirersResult,
    inspirersResult=> inspirersResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInspirers,
    selectById: selectInspirerById,
    selectIds: selectInspirersIds
    // Pass in a selector that returns the posts slice of state
} = inspirersAdapter.getSelectors(state => selectInspirersData(state)?? initialState)


