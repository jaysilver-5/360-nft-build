import { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
// import { useMoralis, useMoralisCloudFunction, useMoralisFile } from 'react-moralis'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Layout from '../../components/Layout'
import LAccountsCol from '../../components/sections/LAccountsCol'
import RAccountsCol from '../../components/sections/racol/RAccountsCol'
import fonts from '../../styles/Fonts.module.css'
import Button from '../../components/basic/button/Button'
import Textbox from '../../components/basic/textbox/Textbox'
import Label from '../../components/basic/label/Label'
import styles from '../../styles/Accounts.module.css'

const Signup = () => {
    const router = useRouter()
    // const { Moralis } = useMoralis()
    // const uMoralisUsername = useSelector(state => state.user.moralisUserName)
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [validationError, setValidationError] = useState('')

    // const { fetch, data, error } = useMoralisCloudFunction('usernameAlreadyExists', { uname: username }, { autoFetch: false })

    useEffect(() => {
        const updateUserData = async () => {
          try {
            console.log(data);
      
            if (data === false) {
              // Define your query here
              const UserClass = Moralis.Object.extend('User');
              const query = new Moralis.Query(UserClass).equalTo('username', uMoralisUsername);
              const results = await query.find();
              const user = JSON.parse(JSON.stringify(results));
              const objId = user[0].objectId;
              const userObj = new Moralis.Query(UserClass).get(objId);
              userObj.set('trapUsername', username);
              userObj.set('name', fullname);
              await userObj.save();
              router.push('/accounts/signin');
            } else if (data === true) {
              setValidationError('Username already exists');
            }
          } catch (error) {
            // Handle errors here
            console.error('Error:', error);
          }
        };
      
        updateUserData();
      }, [data]);
      

    const createAccount = async () =>{
        if (fullname) {
            if (username) {
                var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
                if(format.test(username))
                    setValidationError(`Your username contains invalid characters.\nPlease remove any invalid character ${format}.`)
                else
                    await fetch()
            } else
                setValidationError('Please enter your username')
        } else
            setValidationError('Please enter your full name')

    }

    return (
        <Layout backgroundImage='signup'>
            <div className='row'>
                <LAccountsCol logo='../images/accounts/360sUp.svg' image='../images/accounts/sign-up-banner.jpg' alt=''/>
                <RAccountsCol>
                    <>
                        { validationError && <Alert variant='danger'>
                                            <Alert.Heading>{validationError}</Alert.Heading>
                                        </Alert>
                        }
                        <h1 className={`color-primary ${fonts.druk}`} style={{marginBottom: 32}}>
                            SIGN UP
                            <br/>
                            FOR
                            <span className={`color-accent-orange ${fonts.gilroy}`}> 360 </span>NFT 
                        </h1>
                        <Label>Full Name</Label>
                        <Textbox type='text' onChange={e => setFullname(e.target.value)}/>
                        <Label>Username</Label>
                        <Textbox type='text' onChange={e => setUsername(e.target.value)}/>
                        <Button onClick={createAccount} text='Create My Account' bg='orangeToPink'/>
                    </>
                </RAccountsCol>
            </div>
        </Layout>
    )
}

export default Signup

// import { useState, useEffect } from 'react'
// import { Alert } from 'react-bootstrap'
// import { useMoralis, useMoralisCloudFunction, useMoralisFile } from 'react-moralis'
// import { useRouter } from 'next/router';
// import { useSelector, useDispatch } from 'react-redux'
// import Link from 'next/link'
// import Layout from '../../components/Layout'
// import LAccountsCol from '../../components/sections/LAccountsCol'
// import RAccountsCol from '../../components/sections/racol/RAccountsCol'
// import fonts from '../../styles/Fonts.module.css'
// import Button from '../../components/basic/button/Button'
// import Textbox from '../../components/basic/textbox/Textbox'
// import Label from '../../components/basic/label/Label'
// import styles from '../../styles/Accounts.module.css'

// const Signup = () => {
//     const router = useRouter()
//     const { Moralis } = useMoralis()
//     const uMoralisUsername = useSelector(state => state.user.moralisUserName)
//     const [fullname, setFullname] = useState('')
//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [validationError, setValidationError] = useState('')

//     const { fetch, data, error } = useMoralisCloudFunction('usernameAlreadyExists', { uname: username }, { autoFetch: false })

//     useEffect( async () => {
//         if (data == false){
//             // const UserClass = await Moralis.Object.extend('User')
//             // const query = new Moralis.Query(UserClass).equalTo('username', uMoralisUsername)
//             // const results = await query.find()
//             // const user = JSON.parse(JSON.stringify(results))
//             // const objId = (user[0].objectId)
//             // const userObj = await new Moralis.Query(UserClass).get(objId)
//             const userObj = new Moralis.User();
//             userObj.set('trapUsername', username)
//             userObj.set('name', fullname)
//             userObj.set('email', email)
//             userObj.set('password', password)
//             await userObj.save()
//             router.push('/accounts/signin')
//         } else if (data == true)
//                 setValidationError('Username already exists')
//     }, [data])

//     const createAccount = async () =>{
//         if (fullname) {
//             if (username) {
//                 var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
//                 if(format.test(username)){
//                     setValidationError(`Your username contains invalid characters.\nPlease remove any invalid character ${format}.`)
//                     return
//                 }
//                 if (!email) {
//                     setValidationError('Please enter your email')
//                     return
//                 }
//                 if (!password) {
//                     setValidationError('Please enter your password')
//                     return
//                 }
//                 await fetch()
//             } else
//                 setValidationError('Please enter your username')
//         } else
//             setValidationError('Please enter your full name')

//     }

//     return (
//         <Layout backgroundImage='signup'>
//             <div className='row'>
//                 <LAccountsCol logo='../images/accounts/360sUp.svg' image='../images/accounts/sign-up-banner.jpg' alt=''/>
//                 <RAccountsCol>
//                     <>
//                         { validationError && <Alert variant='danger'>
//                                             <Alert.Heading>{validationError}</Alert.Heading>
//                                         </Alert>
//                         }
//                         <h1 className={`color-primary ${fonts.druk}`} style={{marginBottom: 32}}>
//                             SIGN UP
//                             <br/>
//                             FOR
//                             <span className={`color-accent-orange ${fonts.gilroy}`}> 360 </span>NFT 
//                         </h1>
//                         <Label>Full Name</Label>
//                         <Textbox type='text' onChange={e => setFullname(e.target.value)}/>
//                         <Label>Username</Label>
//                         <Textbox type='text' onChange={e => setUsername(e.target.value)}/>
//                         <Label>Email</Label>
//                         <Textbox type='email' onChange={e => setEmail(e.target.value)}/>
//                         <Label>Password</Label>
//                         <Textbox type='password' onChange={e => setPassword(e.target.value)}/>
//                         <Button onClick={createAccount} text='Create My Account' bg='orangeToPink'/>
//                     </>
//                 </RAccountsCol>
//             </div>
//         </Layout>
//     )
// }

// export default Signup

