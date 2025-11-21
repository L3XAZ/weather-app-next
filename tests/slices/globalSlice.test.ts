import reducer, {
    openAlert,
    closeAlert,
} from "@/store/slices/globalSlice";
import { AlertSeverity } from "@/types/ui";

describe("globalSlice", () => {
    const base = {
        alert: { isOpen: false, severity: AlertSeverity.SUCCESS, message: "" },
    };

    test("openAlert", () => {
        const next = reducer(
            base,
            openAlert({ severity: AlertSeverity.ERROR, message: "ERR" })
        );

        expect(next.alert.isOpen).toBe(true);
        expect(next.alert.message).toBe("ERR");
    });

    test("closeAlert", () => {
        const next = reducer(
            { alert: { isOpen: true, severity: 1, message: "X" } },
            closeAlert()
        );

        expect(next.alert.isOpen).toBe(false);
        expect(next.alert.message).toBe("");
    });
});
