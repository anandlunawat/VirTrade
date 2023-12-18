import Link from "next/link";
import { useState } from "react";
import { Login } from "../actions/login";
import { useRouter } from 'next/router'
import { Layout } from "../Components/Layout";

export default function Auth() {
    const [cred, setCred] = useState({
        cc: "",
        pass: "",
        totp: "",
    })
    const router = useRouter()
    async function login(e) {
        e.preventDefault();
        const apiKey = process.env.NEXT_PUBLIC_API_KEY
        console.log("apiKey",apiKey)
        const data = await Login(cred.cc, cred.pass, cred.totp,apiKey)
        data ? router.push("/Staking") : alert("Error")
    }
    function updateChange(event) {
        const { value, name } = event.target
        setCred((preValue) => {
            if (name === "clientCode") {
                localStorage.setItem("clientCode", value)
                return {
                    cc: value,
                    pass: preValue.pass,
                    totp: preValue.totp
                }
            } else if (name === "password") {
                return {
                    cc: preValue.cc,
                    pass: value,
                    totp: preValue.totp
                }
            } else {
                return {
                    cc: preValue.cc,
                    pass: preValue.pass,
                    totp: value
                }
            }
        })
    }
    return (
        <Layout>        
            <div className="flex md:mt-40 mt-16 flex-row gap-9 items-center justify-center md:ml-[25%] m-4 md:mr-[25%] p-5 border-[1px] border-slate-600 border-opacity-25 bg-[#262424] bg-opacity-25 rounded-xl max-lg:flex-col ">
                <div className="justify-center text-5xl font-extrabold text-green-500 max-sm:text-3xl">
                    <Link href="/">VirTrade</Link>
                </div>
                <form onSubmit={login} className="flex flex-col w-full p-6 text-white bg-transparent border-l-2 gap-9 max-sm:border-l-0 max-sm:p-0 max-sm:w-full max-lg:border-l-0 max-lg:p-0 max-lg:w-full" method="post">
                    <div className="relative">
                        <input type="text" id="cc" name="clientCode" className="bg-transparent border-b-[2px] w-full peer/cc focus:outline-none focus:border-green-500 placeholder-transparent" placeholder="Client Code" onChange={updateChange}></input>
                        <label className="absolute left-0 text-green-500 pointer-events-none -top-6 peer-placeholder-shown/cc:text-white peer-placeholder-shown/cc:-top-1.5 peer-focus/cc:text-green-500 peer-focus/cc:-top-6">Client Code</label>
                    </div>
                    <div className="relative">
                        <input type="password" id="pass" name="password" className="bg-transparent border-b-[2px] w-full peer/pass focus:outline-none focus:border-green-500 placeholder-transparent" placeholder="Password" onChange={updateChange}></input>
                        <label className="absolute left-0 text-green-500 pointer-events-none -top-6 peer-placeholder-shown/pass:text-base peer-placeholder-shown/pass:text-white peer-placeholder-shown/pass:-top-1.5 peer-focus/pass:-top-6 peer-focus/pass:text-green-500">Password</label>
                    </div>
                    <div className="relative">
                        <input type="number" id="otp" name="otp" className="bg-transparent border-b-[2px] w-full peer/otp focus:outline-none focus:border-green-500 placeholder-transparent" placeholder="TOTP" onChange={updateChange}></input>
                        <label className="absolute left-0 text-green-500 pointer-events-none -top-6 peer-placeholder-shown/otp:text-base peer-placeholder-shown/otp:text-white peer-placeholder-shown/otp:-top-1.5 peer-focus/otp:-top-6 peer-focus/otp:text-green-500">TOTP</label>
                    </div>
                    <Link href={"/"} className="text-right underline place-self-end"> Forgot Password</Link>
                    <button type="submit" className="p-2 text-lg font-semibold text-center text-black bg-green-500 rounded-lg" >Login</button>
                    <div className="text-center">
                        Dont have an account?
                        <a className="underline" href="https://www.angelone.in/open-demat-account">Register</a>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
