import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false);
    let isLoggedIn = useSelector(state => state.user.isLoggedIn)

    useEffect(() => {
        authCheck(router.asPath)
    }, [useSelector(state => state.user.isLoggedIn)])

    useEffect(() => {
        authCheck(router.asPath)
         //Hide page content by setting authorized to false on route change 
         const hideContent = () => setAuthorized(false);
         router.events.on('routeChangeStart', hideContent);
         router.events.on('routeChangeComplete', authCheck)
         return () => {
             router.events.off('routeChangeStart', hideContent);
             router.events.off('routeChangeComplete', authCheck);
         }
    }, []);

    function authCheck(url) {
        // const publicPaths = ['/accounts/signin', '/accounts/signout', '/accounts/signup', '/feed', '/']
        const publicPaths = ['/feed', '/', '/privacypolicy', '/faq', '/accounts/signin', '/accounts/signout', '/accounts/signup']
        const path = url.split('?')[0]
        // console.log(url);
        // console.log(router.query.r)
        // console.log(url.split('?')[1])
        // if (url.split('?')[1] == 'r'){
        //     router.push('/feed')
        //     router.reload()
        // }
        if (!isLoggedIn && !publicPaths.includes(path)) {
            setAuthorized(false)
            router.push({
                pathname: '/feed',
                // query: { r: router.asPath }
            });
        }else
            setAuthorized(true);
    }

    return (authorized && children);
}