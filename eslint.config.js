const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
    {
        ignores: ['node_modules', '.next', 'dist', 'public', 'coverage', 'eslint.config.js'],
    },

    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                window: true,
                document: true,
                localStorage: true,
                fetch: true,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            jest: jestPlugin,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },

    {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', 'tests/**'],
        languageOptions: {
            globals: {
                describe: true,
                test: true,
                it: true,
                expect: true,
                beforeAll: true,
                afterAll: true,
                beforeEach: true,
                afterEach: true,
            },
        },
        plugins: { jest: jestPlugin },
        rules: {
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/valid-expect': 'error',
        },
    },
];
