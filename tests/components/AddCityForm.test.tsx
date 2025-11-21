import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/hooks/useAddCityForm", () => ({
    useAddCityForm: jest.fn(),
}));

import { useAddCityForm } from "@/hooks/useAddCityForm";
import AddCityForm from "@/components/AddCityForm/AddCityForm";

describe("AddCityForm", () => {
    test("submit calls hook submit()", async () => {
        const mockSubmit = jest.fn();

        (useAddCityForm as jest.Mock).mockReturnValue({
            value: "Kyiv",
            error: null,
            onChange: jest.fn(),
            submit: mockSubmit,
        });

        render(<AddCityForm />);

        const btn = screen.getByRole("button", { name: /add/i });

        fireEvent.click(btn);

        expect(mockSubmit).toHaveBeenCalled();
    });

    test("shows error message", () => {
        (useAddCityForm as jest.Mock).mockReturnValue({
            value: "",
            error: "City not found",
            onChange: jest.fn(),
            submit: jest.fn(),
        });

        render(<AddCityForm />);

        expect(screen.getByText("City not found")).toBeInTheDocument();
    });
});
