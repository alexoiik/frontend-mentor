import { useState, useMemo } from "react";
import { convertTemperature } from "../utils/conversions";

// Same mapping used in your DailyForecast
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

const HourlyForecast = ({ hourly, units }) => {
    const weekDays = useMemo(
        () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        []
    );
    const todayIndex = new Date().getDay();
    const [selectedDay, setSelectedDay] = useState(weekDays[todayIndex]);

    if (!hourly) return null;

    // Filter hourly data to only include selected day
    const filteredHours = hourly.time
        .map((time, idx) => {
            const date = new Date(time);
            const dayName = weekDays[date.getDay()];
            return {
                hour: date.toLocaleTimeString("en-US", { hour: "numeric" }),
                temperature: hourly.temperature_2m[idx],
                icon: weatherIconMap[hourly.weathercode[idx]] ?? "icon-sunny.webp",
                day: dayName,
            };
        })
        .filter((item) => item.day === selectedDay)
        .slice(0, 8); // LIMIT to 8 hours

    return (
        <div className="w-full max-w-sm">
            <div className="bg-[#25253f] p-4 rounded-xl flex flex-col gap-[25px]">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-left">
                        Hourly forecast
                    </h2>

                    {/* Day Dropdown */}
                    <select
                        className="bg-[#3c3a5e] text-white text-sm px-2 py-1 rounded-md"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        {weekDays.map((day, idx) => (
                            <option key={idx} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredHours.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between w-full bg-white/10 p-2 rounded-lg"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={`/assets/images/${item.icon}`}
                                alt="icon"
                                className="w-6 h-6"
                            />
                            <span className="text-xs opacity-80">{item.hour}</span>
                        </div>

                        <span className="text-base font-semibold">
                            {convertTemperature(item.temperature, units.temperature)}
                            {units.temperature === "fahrenheit" ? "ºF" : "ºC"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
