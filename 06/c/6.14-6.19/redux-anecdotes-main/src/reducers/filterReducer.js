import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            state.filter = action.payload
        }
    }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer