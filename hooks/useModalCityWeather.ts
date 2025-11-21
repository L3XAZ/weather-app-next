import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { unselectCity, selectSelectedCity } from '@/store/slices/citiesSlice';
import { useCallback, useMemo } from 'react';
import { getTodayString, getMainValues } from '@/lib/weatherHelpers';
import type { FetchedCityWeather } from '@/types/weather';

export const useModalCityWeather = () => {
    const dispatch = useAppDispatch();
    const city = useAppSelector(selectSelectedCity) as FetchedCityWeather | null;

    const handleClose = useCallback(() => {
        dispatch(unselectCity());
    }, [dispatch]);

    const prepared = useMemo(() => {
        if (!city) return null;

        const today = getTodayString();
        const values = getMainValues(city.main);

        return {
            today,
            values,
            weather: city.weather[0],
        };
    }, [city]);

    return {
        city,
        prepared,
        handleClose,
    };
};
