import Link from "next/link";
import { logout } from "../actions/logout";
import { useState , useEffect } from "react";

export default function Navbar() {
  const[hydrated,isHydrated] = useState(false)
  useEffect(()=>{
    isHydrated(true)
  },[])

  async function logOut() {
    try{
      const data = await logout();      
      data.success ? router.push("/") : alert(data.message)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    !hydrated ? null :
    <div className="flex flex-row fixed top-0 items-center w-full mb-4 text-white bg-opacity-40 bg-[#262424] max-sm:justify-start\">
      <div className="text-3xl font-extrabold text-green-500 ml-7 basis-3/4 max-sm:ml-2">
        <Link href="/">VirTrade</Link>
      </div>
      <div className="flex flex-row items-center justify-center text-lg font-semibold text-center basis-1/4 max-sm:hidden">
        <Link className="p-4 basis-1/4" href="/Login">
          <button className="text-lg font-semibold">
            Contact
          </button>
        </Link>
        {
          ((typeof window !== 'undefined') ? localStorage.getItem("feedToken") : false)
            ? (
            <button
            className="p-1 bg-green-500 rounded-md basis-1/4 max-sm:hidden w-96"
            onClick={logOut}
          >
            Logout
          </button>
          ) : (
            <Link
            className="p-1 bg-green-500 rounded-md basis-1/4 max-sm:hidden w-96"
            href="https://www.angelone.in/open-demat-account"
          >
            Register Now
          </Link>
          )
        }
      </div>
    </div>
  );
}
