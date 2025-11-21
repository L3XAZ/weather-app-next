import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks/useModalCityWeather', () => ({
    useModalCityWeather: jest.fn(),
}));

jest.mock('@/components/ui/DynamicSvgIcon/DynamicSvgIcon', () => ({
    __esModule: true,
    default: () => <div data-testid="icon" />,
}));

jest.mock('@/components/ModalCityWeather/HourlyChart/HourlyChart', () => ({
    __esModule: true,
    default: () => <div data-testid="hourly-chart" />,
}));

import { useModalCityWeather } from '@/hooks/useModalCityWeather';
import ModalCityWeather from '@/components/ModalCityWeather/ModalCityWeather';

describe('ModalCityWeather', () => {
    beforeEach(() => jest.clearAllMocks());

    const mockData = {
        city: {
            id: 1,
            name: 'London',
            weather: [{ id: 1, main: 'Clouds', description: 'overcast', icon: '01d' }],
            main: {
                temp: 25,
                feels_like: 23,
                temp_min: 20,
                temp_max: 30,
                humidity: 57,
            },
        },
        prepared: {
            today: '20 Nov',
            values: {
                temp: 25,
                feels_like: 23,
                humidity: 57,
                temp_min: 20,
                temp_max: 30,
            },
            weather: {
                icon: '01d',
                main: 'Clouds',
                description: 'overcast',
            },
        },
        handleClose: jest.fn(),
    };

    test('does not render if city or prepared is missing', () => {
        jest.mocked(useModalCityWeather).mockReturnValue({
            city: null,
            prepared: null,
            handleClose: jest.fn(),
        });

        const { container } = render(<ModalCityWeather />);

        expect(container.firstChild).toBeNull();
    });

    test('renders proper weather info', () => {
        (useModalCityWeather as jest.Mock).mockReturnValue(mockData);

        render(<ModalCityWeather />);

        expect(screen.getByText(/london/i)).toBeInTheDocument();
        expect(screen.getByText(/20 nov/i)).toBeInTheDocument();
        expect(screen.getByText(/25°c/i)).toBeInTheDocument();
        expect(screen.getByText(/clouds/i)).toBeInTheDocument();
        expect(screen.getByText(/overcast/i)).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByTestId('hourly-chart')).toBeInTheDocument();
    });

    test('close button triggers handler', () => {
        (useModalCityWeather as jest.Mock).mockReturnValue(mockData);

        render(<ModalCityWeather />);

        const btn = screen.getByRole('button');

        fireEvent.click(btn);

        expect(mockData.handleClose).toHaveBeenCalledTimes(1);
    });
});
