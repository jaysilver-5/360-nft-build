import { createSlice } from '@reduxjs/toolkit'

const defaults = { streamUrl: '' }
export const playerSlice = createSlice({
    name: 'player',
    initialState: defaults,
    reducers: {
        setStreamUrl: (state, action) => {
             state.streamUrl = action.payload 
            }
        }
})

export const { setStreamUrl } = playerSlice.actions
export default playerSlice.reducer


