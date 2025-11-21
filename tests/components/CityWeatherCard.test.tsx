import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/hooks/useCityWeatherCard", () => ({
    useCityWeatherCard: jest.fn(),
}));

import { useCityWeatherCard } from "@/hooks/useCityWeatherCard";
import CityWeatherCard from "@/components/CityWeatherCard/CityWeatherCard";

describe("CityWeatherCard", () => {
    test("delete button triggers handler", () => {
        const mockDelete = jest.fn();

        (useCityWeatherCard as jest.Mock).mockReturnValue({
            city: {
                id: 1,
                name: "London",
                weather: [{ id: 1, main: "Clouds", description: "overcast", icon: "01d" }],
                main: { temp: 25, feels_like: 22, temp_min: 10, temp_max: 30, humidity: 50 },
            },
            isLoading: false,
            error: null,
            handleSelect: jest.fn(),
            handleDelete: mockDelete,
            handleRefresh: jest.fn(),
        });

        render(<CityWeatherCard cityRef="London" />);

        const deleteBtn = screen.getByTestId("delete-btn");
        fireEvent.click(deleteBtn);

        expect(mockDelete).toHaveBeenCalled();
    });
});
