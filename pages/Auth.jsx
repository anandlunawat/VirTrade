import Link from "next/link";
import { useEffect, useState} from "react";
import {useRouter} from 'next/router'
import axios from "axios";

export var status = false

export default function Auth() {
    const [cred,setCred] = useState({
        cc:"",
        pass:"",
        totp:""
    })
    const [In,SetIn] = useState(false)
    const router = useRouter()
    const [authorised,setAuthorised] = useState(false)
    useEffect( ()=> {
        if(In) {
            async function Done () {
                var data = JSON.stringify({
                    "clientcode": cred.cc,
                    "password": cred.pass,
                    "totp": cred.totp
                });
                var config = {
                    method: 'post',
                    url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
                    headers : {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'X-UserType': 'USER',
                      'X-SourceID': 'WEB',
                      'X-ClientLocalIP': "192.168.1.10",
                      'X-ClientPublicIP': "192.168.43.134",
                      'X-MACAddress': "14-18-C3-33-66-CA",
                      'X-PrivateKey': "nEH9iQOS"
                    },
                    data : data
                };
                try {
                    const {data} = await axios(config)
                    console.log("Line 31",data)
                    if(data.status) {
                        setAuthorised(true)
                        status = !authorised
                        router.push("/Dashboard")
                    } else {
                        alert("Incorrect ID or password.")
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
            Done()
            SetIn(false)
            setAuthorised(false)
        }
    },[In])
    async function Login (e) {
        e.preventDefault();
        SetIn(true)
    }
    function updateChange(event) {
        const {value,name} = event.target
        setCred((preValue) => {
            if(name === "clientCode") {
                return {
                    cc : value,
                    pass : preValue.pass,
                    totp : preValue.totp
                }
            } else if(name === "password") {
                return {
                    cc : preValue.cc,
                    pass : value,
                    totp : preValue.totp
                }
            } else {
                return {
                    cc : preValue.cc,
                    pass : preValue.pass,
                    totp : value
                }
            }
        })
    }
    return (
        <div className="bg-[url(/BG_IMAGE.png)] w-screen h-screen">
            <div className="left-0 absolute top-20 flex flex-row gap-9 items-center justify-center right-0 ml-[25%] mr-[25%] p-5 border-[1px] border-slate-600 border-opacity-25 bg-slate-500 bg-opacity-25 rounded-xl max-lg:flex-col ">
            <div className="justify-center text-5xl font-extrabold text-orange-500 max-sm:text-3xl">
                <Link href="/">VirTrade</Link>
            </div>
            <form onSubmit={Login} className="flex flex-col w-full p-6 text-white bg-transparent border-l-2 gap-9 max-sm:border-l-0 max-sm:p-0 max-sm:w-full max-lg:border-l-0 max-lg:p-0 max-lg:w-full" method="post">
                <div className="relative">
                    <input type="text" id="cc" name="clientCode" className="bg-transparent border-b-[2px] w-full peer/cc focus:outline-none focus:border-orange-500 placeholder-transparent" placeholder="Client Code" onChange={updateChange}></input>
                    <label className="absolute left-0 text-orange-500 pointer-events-none -top-6 peer-placeholder-shown/cc:text-white peer-placeholder-shown/cc:-top-1.5 peer-focus/cc:text-orange-500 peer-focus/cc:-top-6">Client Code</label>
                </div>
                <div className="relative">
                    <input type="password" id="pass" name="password" className="bg-transparent border-b-[2px] w-full peer/pass focus:outline-none focus:border-orange-500 placeholder-transparent" placeholder="Password" onChange={updateChange}></input>
                    <label className="absolute left-0 text-orange-500 pointer-events-none -top-6 peer-placeholder-shown/pass:text-base peer-placeholder-shown/pass:text-white peer-placeholder-shown/pass:-top-1.5 peer-focus/pass:-top-6 peer-focus/pass:text-orange-500">Password</label>
                </div>
                <div className="relative">
                    <input type="number" id="otp" name="otp" className="bg-transparent border-b-[2px] w-full peer/otp focus:outline-none focus:border-orange-500 placeholder-transparent" placeholder="TOTP" onChange={updateChange}></input>
                    <label className="absolute left-0 text-orange-500 pointer-events-none -top-6 peer-placeholder-shown/otp:text-base peer-placeholder-shown/otp:text-white peer-placeholder-shown/otp:-top-1.5 peer-focus/otp:-top-6 peer-focus/otp:text-orange-500">TOTP</label>
                </div>
                <Link href={"/"} className="text-right underline place-self-end"> Forgot Password</Link>
                <button type="submit" className="p-2 text-lg font-semibold text-center bg-orange-500 rounded-lg" >Login</button>
                <div className="text-center">
                    Dont have an account?
                    <a className="underline" href="https://www.angelone.in/open-demat-account">Register</a>
                </div>
            </form>
            </div>
        </div>
    )
}
