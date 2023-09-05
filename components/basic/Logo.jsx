import Link from 'next/link'
import Button from '../basic/button/Button'
import { useRouter } from 'next/router'

const Logo = () => {
    const router = useRouter();
    
    return (
        <Button type='secondary' onClick={() => router.push('/accounts/signin')}>        
            <div className='image-logo'/>
        </Button>
    )
}

export default Logo
