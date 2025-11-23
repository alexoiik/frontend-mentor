# Weather App

A modern weather dashboard built with React that provides current weather, daily and hourly forecasts, and supports multiple unit conversions. The app is visually appealing, responsive, and fully interactive.

## 🚀 Features

- **Current Weather**: Displays temperature, weather icon, location, and date.
- **Daily Forecast**: Shows weather for the upcoming days with max/min temperatures.
- **Hourly Forecast**: Displays 8-hour forecast for a selected day.
- **Unit Conversions**: Switch between Celsius/Fahrenheit, km/h/mph for wind, and mm/in for precipitation.
- **Dynamic Weather Icons**: Updates icons based on weather codes.
- **Responsive Layout**: Works on mobile, tablet, and desktop devices.
- **Search Locations**: Search weather for any city worldwide.
- **Compact and Clean UI**: Designed with TailwindCSS for modern look.

## 🛠 Technologies Used

- **React** – Frontend framework.
- **TailwindCSS** – Utility-first CSS framework for styling.
- **Open-Meteo API** – Weather data API.
- **React Hooks** – State management and side effects.
- **JavaScript (ES6+)** – Main programming language.

## 🔧 Installation & Setup

### Clone the repo
`git clone https://github.com/your-username/frontend-mentor.git`

### Navigate to the project
`cd weather-app`

### Install dependencies
`npm install`

### Run the project
`npm run start`

## 💡 What I Learned

- **React Hooks**: Using `useState`, `useEffect`, and `useMemo` effectively to manage state, fetch data, and optimize performance.
- **Conditional Rendering**: Handling loading states, error states, and dynamic updates based on user input.
- **API Integration**: Fetching and working with external APIs (Open-Meteo and Geocoding API) to retrieve and process weather data.
- **Dynamic UI Components**: Creating reusable components for daily and hourly forecasts that update based on user interaction.
- **Responsive Design**: Building a mobile-first, responsive layout with TailwindCSS.
- **Unit Conversion Logic**: Implementing temperature, wind speed, and precipitation conversions dynamically.
- **Dropdown & Select Management**: Handling multiple dropdowns for unit selection and day selection with React state.
- **Date and Time Manipulation**: Converting timestamps to local time and formatting dates for daily and hourly forecasts.
- **Conditional Styling**: Updating icons and card styles based on weather codes and selected units.
- **Best Practices in React**: Keeping hooks at the top level, avoiding conditional hook calls, and ensuring predictable renders.
- **Error Handling & UX**: Displaying fallback UI for loading states and errors to enhance user experience.

