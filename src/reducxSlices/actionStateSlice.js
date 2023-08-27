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
    isOverColor:false,
    selectedProfileID:null,
    isEditProfile:false,
    isCreatePost:false
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
        },
        setSelectedProfileID:(state, action)=>{
            state.selectedProfileID=action.payload
        },
        setIsEditProfile:(state, action)=>{
            state.isEditProfile=!state.isEditProfile
        },
        setIsCreatePost:(state, action)=>{
            state.isCreatePost=!state.isCreatePost
        }
    }
})

export const {setIsToggleMobileNav,setIsOverPage, setIsAccountNav, setPageWidth, setSelectedNotification,
    setFeedPosts, setViewInspiration, setOpenMobileSearchComponent,setIsSearched,setInspirersFollowed,
    setBeenFollowed,setSuggested,setSelectedInspiration,setIsOverColor,setIsCreatePost, setSelectedProfileID, setIsEditProfile} = myStatesSlice.actions;

export default myStatesSlice.reducer;