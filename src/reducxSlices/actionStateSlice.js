import {createSlice} from '@reduxjs/toolkit'

/* const myId= JSON.parse(localStorage.getItem("myUserId")); */

const initialState={
    openMobileSearchComponent:false,
    pageWidth:0,
    selectedNotification:null,
    feedPosts:null,
    viewInspiration:false,
    selectedInspiration:{},
    isSearched:false,
    inspirersFollowed:[],
    beenFollowed:[],
    suggested:[],
    isOverColor:false
}

export const myStatesSlice =createSlice({
    name: 'myState',
    initialState,
    reducers:{
      
        setPageWidth:(state, action)=>{
            state.pageWidth= action.payload
        },
        setSelectedNotification:(state, action)=>{
            state.selectedNotification= action.payload
        },
        setFeedPosts:(state, action)=>{
            state.feedPosts=action.payload
        },
        setViewInspiration:(state, action)=>{
            state.viewInspiration=!state.viewInspiration
        },
        setOpenMobileSearchComponent:(state, action)=>{
            state.openMobileSearchComponent=!state.openMobileSearchComponent
        },
        setIsSearched:(state, action)=>{
            state.isSearched=action.payload
        },
        setInspirersFollowed:(state, action)=>{
            state.inspirersFollowed=action.payload
        },
        setBeenFollowed:(state, action)=>{
            state.beenFollowed=action.payload
        },
        setSuggested:(state, action)=>{
            state.suggested=action.payload
        },
        setSelectedInspiration:(state, action)=>{
            state.selectedInspiration=action.payload
        },
        setIsOverColor:(state, action)=>{
            state.isOverColor=!state.isOverColor
        }
    }
})

export const {setIsToggleMobileNav,setIsOverPage, setIsAccountNav, setPageWidth, setSelectedNotification,
    setFeedPosts, setViewInspiration, setOpenMobileSearchComponent,setIsSearched,setInspirersFollowed,
    setBeenFollowed,setSuggested,setSelectedInspiration,setIsOverColor} = myStatesSlice.actions;

export default myStatesSlice.reducer;