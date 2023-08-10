import styles from "../styles/loader.module.css";

export default function Loader() {
    return (
        <div className="absolute inset-[40%]">
            <div className={`${styles.loader} rounded-full shadow-[0px_0px_10px_2px] shadow-green-500 w-52 h-52 border-t-[10px] border-t-green-500`}>
                <div className={`bg-black w-[220px] h-[220px] rounded-full`}></div>
            </div>
        </div>
    )
}