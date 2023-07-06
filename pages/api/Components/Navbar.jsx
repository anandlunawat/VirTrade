import Link from "next/link";
import { logout } from "../../../actions/logout";

export default function Navbar() {
  return (
    <div className="flex flex-row fixed top-0 items-center w-full mb-4 text-white bg-opacity-70 bg-[#2a2929] max-sm:justify-start\">
      <div className="text-3xl font-extrabold text-orange-500 ml-7 basis-3/4 max-sm:ml-2">
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
            <Link
            className="p-1 bg-orange-500 rounded-md basis-1/4 max-sm:hidden w-96"
            href="/"
            onClick={logout}
          >
            Logout
          </Link>
          ) : (
            <Link
            className="p-1 bg-orange-500 rounded-md basis-1/4 max-sm:hidden w-96"
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
