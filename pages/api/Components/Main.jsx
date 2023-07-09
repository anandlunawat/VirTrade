import Link from "next/link";

export default function Main() {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center w-11/12 max-sm:flex-col max-sm:ml-2">
            <div className="items-center text-white basis-1/2">
                <div>
                    <p className="font-semibold text-7xl max-sm:text-4xl sm:max-lg:text-3xl">
                        Virtual trade stocks using VirTrade
                    </p>
                    <p className="mt-8 text-lg top-2">
                        With more than 1600 stocks listed on NSE and a total market cap of
                        approximately $3.4 trillion circulating in the market today, start
                        your trading journey using VirTrade.
                    </p>
                </div>
                <div className="flex flex-row gap-3 mt-8 basis-1/3">
                    <div className="w-full p-2 text-lg font-semibold text-center text-black bg-green-500 rounded-md basis-1/6">
                        <a
                            href="https://www.angelone.in/open-demat-account"
                        >
                            Register
                        </a>
                    </div>
                        <Link href={"/Auth"} className="items-center p-2 text-lg font-semibold text-center text-white border-green-500 border-solid rounded-md basis-1/6 border-x border-y">
                            Login
                        </Link>
                </div>
            </div>
            <div className="items-center justify-center pointer-events-none basis-1/2">
                <img alt="vector" className="max-sm:hidden" src="/Landing-page.png" />
            </div>
        </div>
    );
}
