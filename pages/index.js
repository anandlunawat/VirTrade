// import Details from "./api/Components/Details"
// import  Main  from "./api/Components/Main"
import Auth from "./Auth"
import { printLogs } from "../actions/logs";

export default function Home() {
  printLogs("In index.js")
  return (
        <div>
          <Auth />
        </div>
  )
}
