import styles from "../styles/loader.module.css";

export default function Loader() {
    return (
        <div className="absolute inset-[40%] max-sm:inset-[20%] max-sm:top-[30%]">            
            <div className={`bg-black ${styles.loader} border-green-500 border-t-8 w-52 h-52 rounded-full`}></div>            
        </div>
    )
}