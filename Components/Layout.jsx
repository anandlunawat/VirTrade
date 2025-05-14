import Market from "./Market"
import { usePathname } from 'next/navigation';
import { printLogs } from "../actions/logs";

export function Layout({ children }) {
    printLogs("In Layout.jsx")
    const pathname = usePathname();
    printLogs("pathname", pathname)
    return (
        <div className="bg-black bg-contain h-fit">
            {
                pathname === "/" ? <main>{children}</main>
                    : <Market>
                        <main>{children}</main>
                    </Market>
            }
        </div>
    )
}