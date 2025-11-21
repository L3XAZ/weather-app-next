import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('recharts', () => {
    const Original = jest.requireActual('recharts');
    return {
        ...Original,
        ResponsiveContainer: ({ children }: any) => (
            <div style={{ width: 400, height: 300 }}>{children}</div>
        ),
    };
});

jest.mock('@/hooks/useHourlyChart', () => ({
    useHourlyChart: jest.fn(),
}));

import { useHourlyChart } from '@/hooks/useHourlyChart';
import HourlyChart from '@/components/ModalCityWeather/HourlyChart/HourlyChart';

describe('HourlyChart', () => {
    test('renders chart without crashing', () => {
        (useHourlyChart as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            chartData: [
                { temp: 25, hours: '12:00' },
                { temp: 27, hours: '15:00' },
            ],
        });

        render(<HourlyChart cityName="London" />);

        expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    });
});
