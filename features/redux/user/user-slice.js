import { createSlice } from '@reduxjs/toolkit'

// const defaults = {name: 'Casmir Patterson', uname: 'askcasmir', email: 'founder@nftyco.com', onWait: 'true', upic: '/images/user/avatar.jpg', ucover: '/images/user/cover.jpg', UserName: '', Object: {}}
const defaults = {
   name: '', 
   uname: '',
   email: '',
   onWait: 'true',
   upic: '/images/user/avatar.jpg',
   ucover: '/images/user/cover.jpg',
   UserName: '',
   walletAddress: '',
   isLoggedIn: false,
}


export const userSlice = createSlice({
   
    name: 'user',
    initialState: defaults,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload || defaults.name
           },
        setUName: (state, action) => {
            state.uname = action.payload 
           },
        setEmail: (state, action) => { 
           state.email = action.payload
        },
        setPic: (state, action) => { 
           state.upic = action.payload
        },
        setCover: (state, action) => { 
           state.ucover = action.payload
        },
        setUserName: (state, action) => { 
           state.moralisUserName = action.payload
        },
        setWalletAddress: (state, action) => { 
           state.walletAddress = action.payload
        },
        setUserLoggedIn: (state, action) => { 
         state.isLoggedIn = action.payload
      },
    }
})
export const { setName, setUName, setEmail, setPic, setCover, setUserName, setWalletAddress, setUserLoggedIn } = userSlice.actions
export default userSlice.reducer


// export const login = () => {

//    const { authenticate, isAuthenticating, isAuthenticated, authError, user: moralisUser } = useMoralis()
//    const { data: userTable, error, isLoading } = useMoralisQuery('User');

//    authenticate().then(() => {
//       if (isAuthenticated) {
//          defaults.moralisUserName = moralisUser.get('username')
//          const results = JSON.parse(JSON.stringify(userTable))
//          const image = results[0]?.avatar.url
//          defaults.upic = image
//          console.log('img', image)
//       }
//    })
// }


