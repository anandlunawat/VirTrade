export function Background() {
    return (
        <video className="object-fill w-full h-full pointer-events-none" autoPlay loop muted>
            <source src="BG_VIDEO.mp4" type="video/mp4" />
        </video>
    )
}