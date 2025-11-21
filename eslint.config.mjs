import js from "@eslint/js";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
    {
        ignores: [
            "**/node_modules/",
            "**/.next/",
            "dist/",
            "coverage/",
        ],
    },
    js.configs.recommended,
    {
        ...next,
    },
    {
        files: ["**/*.test.{js,jsx,ts,tsx}", "tests/**/*"],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
            },
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    },
    prettier,
];
