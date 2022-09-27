process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

const jest = require('jest');
const argv = process.argv.slice(2);

const CI = process.env.CI;
const hasWatchOption = argv.some((arg) => arg.includes('watch'));

if (!CI && !hasWatchOption) {
  argv.push('--watch');
}

jest.run(argv);
