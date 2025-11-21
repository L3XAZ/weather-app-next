import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },

    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.tsx'],

    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

    transform: {
        '^.+\\.(ts|tsx)$': ['@swc/jest'],
    },
};

export default createJestConfig(customJestConfig);
