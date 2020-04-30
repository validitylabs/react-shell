module.exports = {
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.cache/', '/dist/', '/.git/'],
    testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
