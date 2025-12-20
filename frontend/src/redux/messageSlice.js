import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages: null,
        chatbotMessages: []
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        setChatbotMessages:(state,action)=>{
            state.chatbotMessages = action.payload;
        },
        addChatbotMessage:(state,action)=>{
            if (!state.chatbotMessages) {
                state.chatbotMessages = [];
            }
            state.chatbotMessages.push(action.payload);
        }
    }
});
export const {setMessages, setChatbotMessages, addChatbotMessage} = messageSlice.actions;
export default messageSlice.reducer;