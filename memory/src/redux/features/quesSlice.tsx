import { createSlice } from "@reduxjs/toolkit";


interface SingleData {
  type: string;
    ques: {},
    ans: {}
}

interface StateSchema {
  data: SingleData[]
}

// ------------------------------------------------
const initialState: StateSchema = {
  data: [
    {
      type: "",
      ques: {},
      ans: {}
    }
  ]
}


const queSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    set_ques(state, action: { payload: SingleData[] }) {
      console.log(action.payload)
      state.data = action.payload
    },
  },
});

export const queReducer = queSlice.reducer;
export const set_ques = queSlice.actions.set_ques;