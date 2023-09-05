import { createSlice } from '@reduxjs/toolkit'

const defaults = { file: {}, tokenAlbumArt: {}, tokenName: '', tokenDesc: '', tokenUri: '', tokenPrice: '', tokenArtist: '', tokenUri: ''}
export const uploadSlice = createSlice({
    name: 'upload',
    initialState: defaults,
    reducers: {
        setFile: (state, action) => {
             state.file = action.payload 
            },
        setTokenName: (state, action) => {
             state.tokenName = action.payload 
            },
        setTokenDesc: (state, action) => { 
            state.tokenDesc = action.payload
         },
        setTokenUri: (state, action) => { 
            state.tokenUri = action.payload 
        },
        setTokenPrice: (state, action) => { 
            state.tokenPrice = action.payload
        },
        setTokenArtist: (state, action) => { 
            state.tokenArtist = action.payload 
        },
        setTokenUri: (state, action) => { 
            state.tokenUri = action.payload 
        },
        setTokenAlbumArt: (state, action) => { 
            state.tokenAlbumArt = action.payload 
        },
    }
})

export const { setFile, setTokenName, setTokenDesc, setTokenUri, setTokenPrice, setTokenArtist, setTokenAlbumArt } = uploadSlice.actions
export default uploadSlice.reducer


