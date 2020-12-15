
import {configureStore} from "@reduxjs/toolkit"

import {queReducer} from "./features/quesSlice"


export const store = configureStore({
    reducer: {
        questions : queReducer
    }
})