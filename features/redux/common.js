import { createSlice } from '@reduxjs/toolkit'

const defaults = { email: '' }
export const commonSlice = createSlice({
    name: 'common',
    initialState: defaults,
    reducers: {
        setBuyerEmail: (state, action) => {
             state.email = action.payload 
            }
        }
})

export const { setBuyerEmail } = commonSlice.actions
export default commonSlice.reducer


