import reducer, {
    addCity,
    deleteCity,
    setCities,
    selectCity,
    unselectCity,
} from '@/store/slices/citiesSlice';

describe('citiesSlice', () => {
    const base = { cities: [], selectedCity: null };

    test('setCities', () => {
        const next = reducer(base, setCities(['London']));
        expect(next.cities).toEqual(['London']);
    });

    test('addCity', () => {
        const next = reducer(base, addCity('Kyiv'));
        expect(next.cities).toContain('Kyiv');
    });

    test('deleteCity', () => {
        const next = reducer({ cities: ['Kyiv'], selectedCity: null }, deleteCity('Kyiv'));
        expect(next.cities).toEqual([]);
    });

    test('selectCity', () => {
        const city = { id: 1, name: 'Kyiv', weather: [], main: {} as any };
        const next = reducer(base, selectCity(city));
        expect(next.selectedCity?.name).toBe('Kyiv');
    });

    test('unselectCity', () => {
        const next = reducer({ cities: [], selectedCity: { name: 'Kyiv' } as any }, unselectCity());
        expect(next.selectedCity).toBeNull();
    });
});
