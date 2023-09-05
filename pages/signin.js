import SafeConnect from "../components/SafeConnect";
import SignInBanner from "../public/images/accounts/sign-in-banner.jpg"
import Loader from '../components/basic/loader/Loader';

// export default function Test() {
//     return (
//       <div>
//         <SafeConnect />
//       </div>
//     );
//   }

import React from 'react';


const page = () => {
    return (
        <div className='w-full bg-plain bg-cover h-screen'>
            <div className='flex justify-between'>
                <img src='/images/accounts/sign-in-banner.jpg' className='h-screen' />
                <div className='m-auto gap-y-6'>
                    <h1 className='text-6xl text-secondary font-primary text-[58px] font-extrabold'>
                        LOG IN 
                        <br/> <span className='text-[#00BBFF]'>360</span> NFT
                    </h1>
                    {/* buttons */}
                    <div className='mt-10 flex justify-start'>
                        <SafeConnect />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page