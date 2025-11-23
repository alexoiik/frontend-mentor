// Components.
import Navbar from "./Navbar"

const Error = ({ fetchWeather }) => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-top pt-60 text-center p-6 bg-[#061630] text-white">

                <img
                    src="/assets/images/icon-error.svg"
                    alt="error"
                    className="w-12 h-12 mb-4"
                />

                <h1 className="text-5xl font-semibold mb-3">
                    Something went wrong
                </h1>

                <p className="text-stone-300 mb-6 max-w-md">
                    We couldn't connect to the server (API error).
                    Please try again in a few moments.
                </p>

                <button
                    onClick={fetchWeather}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition"
                >
                    <img
                        src="/assets/images/icon-retry.svg"
                        alt="retry"
                        className="w-5 h-5"
                    />
                    Retry
                </button>
            </div>
        </>
    )
}

export default Error