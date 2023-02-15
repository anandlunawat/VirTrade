import { Background } from "./Background";
import { Navbar } from "./Navbar";

export function Layout({children}) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}