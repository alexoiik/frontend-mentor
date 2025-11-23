import { convertTemperature } from "../utils/conversions";

// Maps Open-Meteo weather codes to your icons
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

const DailyForecast = ({ daily, units }) => {
    if (!daily) return null;

    return (
        <div className="mt-14 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-3 text-left">Daily forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                {daily.time.map((date, idx) => {
                    const day = new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                    });

                    const icon = weatherIconMap[daily.weathercode[idx]] ?? "icon-sunny.webp";

                    return (
                        <div
                            key={idx}
                            className="bg-[#25253f] p-4 rounded-xl flex flex-col items-center text-center"
                        >
                            <p className="text-sm opacity-70 mb-1">{day}</p>

                            <img
                                src={`/assets/images/${icon}`}
                                alt="weather icon"
                                className="w-10 h-10 mb-2"
                            />

                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">
                                    {convertTemperature(daily.temperature_2m_max[idx], units.temperature)}
                                    {units.temperature === "fahrenheit" ? "ºF" : "ºC"}
                                </p>
                                <p className="text-sm opacity-60">
                                    {convertTemperature(daily.temperature_2m_min[idx], units.temperature)}
                                    {units.temperature === "fahrenheit" ? "ºF" : "ºC"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
