import Market from "./Market"
import { usePathname } from 'next/navigation';

export function Layout({ children }) {
    console.log("In Layout.jsx")
    const pathname = usePathname();
    console.log("pathname", pathname)
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