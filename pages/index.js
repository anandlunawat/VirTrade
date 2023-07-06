import Details from "./api/Components/Details"
import  Main  from "./api/Components/Main"

export default function Home() {
  return (
        <div className="ml-8 py-20 max-sm:ml-0 2xl:w-[1150px]">
          <Main />
          <Details />
        </div>  
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