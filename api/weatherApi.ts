import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEATHER_BASE_URL } from "@/constrains";
import type {
    FetchedCityWeather,
    FetchedHourlyForecast,
    HourlyForecast,
} from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${WEATHER_BASE_URL}data/2.5/`}),
    keepUnusedDataFor: 300,
    tagTypes: ["CityWeather"],
    endpoints: (builder) => ({
        getCityWeather: builder.query<FetchedCityWeather, string>({
            query: (cityName) => ({
                url: "weather",
                params: {
                    q: cityName,
                    units: "metric",
                    appid: API_KEY,
                },
            }),
            providesTags: (_res, _err, cityName) => [
                { type: "CityWeather", id: cityName },
            ],
        }),

        getHourlyForecast: builder.query<HourlyForecast, string>({
            query: (cityName) => ({
                url: "forecast",
                params: {
                    q: cityName,
                    units: "metric",
                    cnt: 8,
                    appid: API_KEY,
                },
            }),
            transformResponse: (res: FetchedHourlyForecast) => {
                return res.list.map((item) => {
                    const date = new Date(item.dt_txt);
                    const hours = date.toTimeString().slice(0, 5);

                    return {
                        temp: Math.round(item.main.temp),
                        hours,
                    };
                });
            },
            providesTags: (_res, _err, cityName) => [
                { type: "CityWeather", id: cityName },
            ],
        }),

        getCitiesWeather: builder.query<
            { list: FetchedCityWeather[] },
            number[]
        >({
            query: (ids) => ({
                url: "group",
                params: {
                    id: ids.join(","),
                    units: "metric",
                    appid: API_KEY,
                },
            }),
            providesTags: (result) =>
                result
                    ? result.list.map((city) => ({
                        type: "CityWeather" as const,
                        id: String(city.id),
                    }))
                    : [],
        }),
    }),
});

export const {
    useGetCityWeatherQuery,
    useGetHourlyForecastQuery,
    useGetCitiesWeatherQuery,
} = weatherApi;
