import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'

const privateRoute = Component => {
    const Auth = (props) => {
        const router = useRouter()
        // const [auth,setAuth] = useState(false)
        // useEffect (() => {
        //     if(localStorage.getItem("feedToken")) {
        //         setAuth(!auth)
        //     }
        // },[auth,setAuth])
        // if(!auth) {
        //     router.push("/")
        //     return
        // } else {
        //     return <Component {...props}/>
        // }
        if(typeof window !== "undefined") {
            if(localStorage.getItem("feedToken")) {
                return <Component {...props}/>
            }
        }
        router.push("/")
    }
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }
    return Auth;
}

export default privateRoute;