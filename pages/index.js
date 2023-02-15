import { Logout } from "../utils/Logout"
import { liveData } from "../utils/liveData"
import { previousData } from "../utils/previousData"
import { useEffect, useRef, useState } from "react"
import { Main } from "./api/Components/Main"
import { Navbar } from "./api/Components/Navbar"
import Animation from "./api/Components/Animation"
import Details from "./api/Components/Details"
import { Footer } from "./api/Components/Footer"

export default function Home() {
  return (
    <div className="bg-[url(/BG_IMAGE.png)] sm:h-screen sm:w-screen max-sm:h-screen max-sm:w-screen">
      <Navbar/>
      <div className="2xl:ml-[20%] 2xl:mr-[25%] 2xl:top-0 2xl:flex-nowrap bg-cover">
        <div className="ml-8 max-sm:ml-0 2xl:w-[1150px]">
          <Main />
          {/* <Animation /> */}
        </div>  
        {/* <Details /> */}
      </div>
      <Footer />
    </div>
    // <></>
  )
}

// export async function getStaticProps() {
//     const data =  await Logout();
//     console.log("Line 19 ",data)
//     let person = {firstName:"John", lastName:"Doe", age:"50", eyeColor:"blue"};
//     return {
//       props: {
        
//       }
//     }
// }