import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextDecoder, TextEncoder } from "util";

jest.mock("next/navigation", () => require("next-router-mock"));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
