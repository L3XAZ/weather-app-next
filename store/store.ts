import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import globalReducer from './slices/globalSlice';
import { weatherApi } from '@/store/api/weatherApi';

export const store = configureStore({
    reducer: {
        cities: citiesReducer,
        global: globalReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(weatherApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
