import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/redux", () => ({
    useAppSelector: jest.fn(),
}));

jest.mock("@/hooks/useInitCities", () => ({
    useInitCities: jest.fn(),
}));

jest.mock("@/components/AddCityForm/AddCityForm", () => () => <div>add-form</div>);
jest.mock("@/components/CardList/CardList", () => (props: any) => (
    <div data-testid="card-list">{props.items.length} items</div>
));
jest.mock("@/components/CityWeatherCard/CityWeatherCard", () => () => <div>card</div>);
jest.mock("@/components/ModalCityWeather/ModalCityWeather", () => () => <div>modal</div>);

import { useAppSelector } from "@/hooks/redux";
import { useInitCities } from "@/hooks/useInitCities";
import Page from "@/app/page";

describe("Page", () => {
    test("renders empty state when no cities", () => {
        (useInitCities as jest.Mock).mockReturnValue(true);
        (useAppSelector as jest.Mock).mockReturnValue([]);

        render(<Page />);

        expect(screen.getByText(/awaiting your first city/i)).toBeInTheDocument();
    });

    test("renders card list when cities exist", () => {
        (useInitCities as jest.Mock).mockReturnValue(true);
        (useAppSelector as jest.Mock).mockReturnValue(["London"]);

        render(<Page />);

        expect(screen.getByTestId("card-list")).toHaveTextContent("1 items");
    });
});
