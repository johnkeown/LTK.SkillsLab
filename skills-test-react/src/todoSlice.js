import { createSlice } from "@reduxjs/toolkit";

const initialState = ["initial item 1", "initial item 2"];

const todoSlice = createSlice({
    name: "todoItems",
    initialState,
    reducers: {
        addItem(state, action) {
            console.log("add item:  " + action.payload);
            state.push(action.payload);
        },
        deleteItem(state, action) {
            console.log("delete item:  " + action.payload);
            state.splice(action.payload, 1);
        },
    },
});

export const { addItem, deleteItem } = todoSlice.actions;
export default todoSlice.reducer;
