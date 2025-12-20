import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
        showChatOnMobile:false,
        isChatbotSelected:false,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setShowChatOnMobile:(state,action)=>{
            state.showChatOnMobile = action.payload;
        },
        setIsChatbotSelected:(state,action)=>{
            state.isChatbotSelected = action.payload;
        }
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers,setShowChatOnMobile,setIsChatbotSelected} = userSlice.actions;
export default userSlice.reducer;