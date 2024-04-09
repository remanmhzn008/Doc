import {createSlice} from "@reduxjs/toolkit"

export const userSlice= createSlice({
    name:"user",
    initialState:{
        user:{
            name:''
        },
    },
    reducers:{
        setUser:(state,action)=>{
            console.log('state',state)
            console.log('action',action)
            state.user=action.payload

        }
    }
})

export const {setUser}=userSlice.actions