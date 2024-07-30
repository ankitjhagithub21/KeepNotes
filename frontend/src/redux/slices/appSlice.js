import { createSlice } from '@reduxjs/toolkit'


export const appSlice = createSlice({
  name: 'app',
  initialState:{
    user:null,
    notes:null
  },
  reducers: {
   
    setUser: (state, action) => {
      state.user = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    addNote: (state, action) => {
      state.notes = [...state.notes,action.payload]
    },
    deleteNote:(state,action) =>{
      state.notes = state.notes.filter(note=>note._id != action.payload)
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note._id === action.payload._id);
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          title: action.payload.title,
          content: action.payload.content
        };
      }
    }
    
    
  },
})

export const {  setUser,setNotes ,addNote,deleteNote,updateNote} = appSlice.actions

export default appSlice.reducer