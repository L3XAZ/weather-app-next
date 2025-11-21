import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "@/components/CardList/CardList";

describe("CardList", () => {
    test("renders items", () => {
        const items = ["London", "Kyiv"];

        render(
            <CardList
                items={items}
                keyExtractor={(x) => x}
                renderItem={(item) => <div data-testid="card">{item}</div>}
            />
        );

        expect(screen.getAllByTestId("card")).toHaveLength(2);
    });
});
