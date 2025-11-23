import { convertTemperature } from "../utils/conversions";

// Weather code to icon map
const weatherIconMap = {
    0: "icon-sunny.webp",
    1: "icon-partly-cloudy.webp",
    2: "icon-partly-cloudy.webp",
    3: "icon-overcast.webp",
    45: "icon-fog.webp",
    48: "icon-fog.webp",
    51: "icon-drizzle.webp",
    53: "icon-drizzle.webp",
    55: "icon-drizzle.webp",
    61: "icon-rain.webp",
    63: "icon-rain.webp",
    65: "icon-rain.webp",
    71: "icon-snow.webp",
    73: "icon-snow.webp",
    75: "icon-snow.webp",
    95: "icon-storm.webp",
    96: "icon-storm.webp",
    99: "icon-storm.webp",
};

const MainWeatherCard = ({ locationName, formattedDate, weather, units }) => {
    // Determine the correct icon based on the current weather code.
    const currentCode = weather.current_weather?.weathercode ?? 0;
    const icon = weatherIconMap[currentCode] || "icon-sunny.webp";

    return (
        <div
            className="p-6 md:p-10 rounded-xl max-w-xl w-full bg-center bg-cover h-[250px] md:h-[220px] flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/images/bg-today-large.svg')" }}
        >
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-2xl gap-6 md:gap-0">
                {/* LEFT: LOCATION + DATE */}
                <div className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-semibold">{locationName}</p>
                    <p className="text-stone-300 text-md md:text-lg">{formattedDate}</p>
                </div>

                {/* RIGHT: TEMPERATURE + ICON */}
                <div className="flex items-center space-x-3 md:space-x-4">
                    <img
                        src={`/assets/images/${icon}`}
                        alt="Weather Icon"
                        className="w-12 h-12 md:w-20 md:h-20"
                    />
                    <div className="text-6xl md:text-6xl font-bold">
                        {convertTemperature(weather.current_weather.temperature, units.temperature)}
                        {units.temperature === "fahrenheit" ? "ºF" : "ºC"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainWeatherCard;