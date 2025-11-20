import type { WeatherMainInfo } from "@/types/weather";

export function getMainValues(main: WeatherMainInfo) {
    return {
        temp: Math.round(main.temp),
        feels_like: Math.round(main.feels_like),
        temp_min: Math.round(main.temp_min),
        temp_max: Math.round(main.temp_max),
        humidity: Math.round(main.humidity),
    };
}

export function getTodayString() {
    return new Date().toLocaleDateString();
}
