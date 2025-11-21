import { getCitiesFromLS, addCityToLS, deleteCityFromLS } from '@/lib/localStorage';

import { CITIES_NAMES_KEY } from '@/constants';

describe('localStorage helpers', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('getCitiesFromLS returns [] when empty', () => {
        expect(getCitiesFromLS()).toEqual([]);
    });

    test('addCityToLS stores city', () => {
        addCityToLS('London');

        const raw = localStorage.getItem(CITIES_NAMES_KEY);
        expect(raw).not.toBeNull();
        expect(raw).toContain('London');
    });

    test('deleteCityFromLS removes city', () => {
        addCityToLS('London');
        deleteCityFromLS('London');

        const raw = localStorage.getItem(CITIES_NAMES_KEY);
        expect(raw).not.toBeNull();
        expect(raw).toEqual('[]');
    });
});
