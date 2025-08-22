import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
}

export default createJestConfig(config);