import Footer from "./Footer";
import Navbar from "./Navbar";

export function Layout({children}) {
    return (
        // <div className="bg-[url(/BG_IMAGE.png)] bg-contain h-fit">
        <div className="bg-black bg-contain h-fit">
            <Navbar />
            <main>{children}</main>
            {/* <Footer />         */}
        </div>
    )
}