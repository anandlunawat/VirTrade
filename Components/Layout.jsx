export function Layout({children}) {
    console.log("In Layout.jsx")
    return (
        // <div className="bg-[url(/BG_IMAGE.png)] bg-contain h-fit">
        <div className="bg-black bg-contain h-fit">
            <main>{children}</main>
            {/* <Footer />         */}
        </div>
    )
}