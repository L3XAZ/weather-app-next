export type CityId = number;

export interface WeatherItem {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherMainInfo {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

export interface FetchedCityWeather {
    id: CityId;
    name: string;
    weather: WeatherItem[];
    main: WeatherMainInfo;
}

export interface FetchedHourlyForecastItem {
    weather: WeatherItem[];
    main: WeatherMainInfo;
    dt_txt: string;
}

export interface FetchedHourlyForecast {
    list: FetchedHourlyForecastItem[];
}

export type HourlyForecast = { temp: number; hours: string }[];
