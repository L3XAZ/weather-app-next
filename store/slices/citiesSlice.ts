import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCityToLS, deleteCityFromLS, getCitiesFromLS } from '@/lib/localStorage';
import type { FetchedCityWeather } from '@/types/weather';

interface CitiesState {
    cities: string[];
    selectedCity: FetchedCityWeather | null;
}

const initialState: CitiesState = {
    cities: getCitiesFromLS(),
    selectedCity: null,
};

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities(state, action: PayloadAction<string[]>) {
            state.cities = action.payload;
        },
        addCity(state, action: PayloadAction<string>) {
            const name = action.payload.trim();
            if (!name) return;
            if (!state.cities.includes(name)) {
                state.cities.push(name);
                addCityToLS(name);
            }
        },
        deleteCity(state, action: PayloadAction<string>) {
            const name = action.payload;
            state.cities = state.cities.filter((c) => c !== name);
            deleteCityFromLS(name);
            if (state.selectedCity && state.selectedCity.name === name) {
                state.selectedCity = null;
            }
        },
        selectCity(state, action: PayloadAction<FetchedCityWeather>) {
            state.selectedCity = action.payload;
        },
        unselectCity(state) {
            state.selectedCity = null;
        },
    },
});

export const { setCities, addCity, deleteCity, selectCity, unselectCity } = citiesSlice.actions;
export const selectCities = (state: { cities: CitiesState }) => state.cities.cities;
export const selectSelectedCity = (state: { cities: CitiesState }) => state.cities.selectedCity;
export default citiesSlice.reducer;
