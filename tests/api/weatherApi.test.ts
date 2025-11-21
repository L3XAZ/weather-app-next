import { weatherApi } from '@/store/api/weatherApi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

describe('weatherApi endpoints', () => {
    let store: any;

    beforeEach(() => {
        global.fetch = jest.fn();
        (global.fetch as jest.Mock).mockReset();

        store = configureStore({
            reducer: { [weatherApi.reducerPath]: weatherApi.reducer },
            middleware: (gDM) => gDM().concat(weatherApi.middleware),
        });

        setupListeners(store.dispatch);
    });

    const flush = () => new Promise((r) => setTimeout(r, 0));

    function mockResponse(body: any) {
        return new Response(JSON.stringify(body), { status: 200 });
    }

    test('getCityWeather calls correct URL', async () => {
        (global.fetch as jest.Mock).mockResolvedValue(
            mockResponse({ id: 1, name: 'London', weather: [], main: {} })
        );

        store.dispatch(weatherApi.endpoints.getCityWeather.initiate('London'));

        await flush();

        const req = (global.fetch as jest.Mock).mock.calls[0][0] as Request;

        expect(req.url).toContain('/weather');
    });

    test('getHourlyForecast calls correct URL', async () => {
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse({ list: [] }));

        store.dispatch(weatherApi.endpoints.getHourlyForecast.initiate('London'));

        await flush();

        const req = (global.fetch as jest.Mock).mock.calls[0][0] as Request;

        expect(req.url).toContain('/forecast');
    });

    test('getCitiesWeather calls correct URL', async () => {
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse({ list: [] }));

        store.dispatch(weatherApi.endpoints.getCitiesWeather.initiate([1, 2]));

        await flush();

        const req = (global.fetch as jest.Mock).mock.calls[0][0] as Request;

        expect(req.url).toContain('/group');
    });
});
