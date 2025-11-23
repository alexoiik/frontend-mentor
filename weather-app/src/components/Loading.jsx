// Components.
import Navbar from "./Navbar"

const Loading = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#061630] text-white">
                {/* Animated Loader */}
                <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6"></div>
                {/* Loading Text */}
                <p className="text-lg opacity-80 tracking-wide">
                    Fetching weather data...
                </p>
            </div>
        </>
    )
}

export default Loading