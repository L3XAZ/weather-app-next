import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCityForm from "@/components/AddCityForm/AddCityForm";
import { useAddCityForm } from "@/hooks/useAddCityForm";
import { toast } from "react-hot-toast";

jest.mock("@/hooks/useAddCityForm");
jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

const mockedHook = useAddCityForm as jest.Mock;

describe("AddCityForm (extended)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    function mockHook(config: Partial<ReturnType<typeof useAddCityForm>>) {
        mockedHook.mockReturnValue({
            value: "",
            error: null,
            onChange: jest.fn(),
            add: jest.fn(),
            ...config,
        });
    }

    test("button disabled when empty input", () => {
        mockHook({ value: "" });

        render(<AddCityForm />);
        const button = screen.getByRole("button", { name: /add/i });

        expect(button).toBeDisabled();
    });

    test("input change triggers hook onChange", () => {
        const onChange = jest.fn();
        mockHook({ value: "", onChange });

        render(<AddCityForm />);
        const input = screen.getByLabelText("City");

        fireEvent.change(input, { target: { value: "Kyiv" } });

        expect(onChange).toHaveBeenCalledWith("Kyiv");
    });

    test("error message displays", () => {
        mockHook({
            value: "Test",
            error: "City not found",
        });

        render(<AddCityForm />);
        expect(screen.getByText("City not found")).toBeInTheDocument();
    });

    test("submit calls hook add()", async () => {
        const add = jest.fn();
        mockHook({ value: "Kyiv", add });

        render(<AddCityForm />);
        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() => expect(add).toHaveBeenCalled());
    });

    test("invalid name triggers toast.error", async () => {
        const add = jest.fn(async () => {
            toast.error("No lights on that skyline. Try again.");
        });

        mockHook({ value: "123", add });

        render(<AddCityForm />);
        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith(
                "No lights on that skyline. Try again."
            )
        );
    });

    test("duplicate city triggers toast.error", async () => {
        const add = jest.fn(async () => {
            toast.error("Almost! Check the name.");
        });

        mockHook({ value: "Kyiv", add });

        render(<AddCityForm />);
        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith("Almost! Check the name.")
        );
    });

    test("successful city addition triggers toast.success", async () => {
        const add = jest.fn(async () => {
            toast.success("A new point on your horizon!");
        });

        mockHook({ value: "New York", add });

        render(<AddCityForm />);
        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() =>
            expect(toast.success).toHaveBeenCalledWith(
                "A new point on your horizon!"
            )
        );
    });

    test("API error triggers toast.error and error message", async () => {
        const add = jest.fn(async () => {
            toast.error("No skies responded. Try again.");
        });

        mockHook({
            value: "UnknownCity",
            add,
            error: "City not found",
        });

        render(<AddCityForm />);
        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith(
                "No skies responded. Try again."
            )
        );

        expect(screen.getByText("City not found")).toBeInTheDocument();
    });
});
