/* eslint-disable */
export default {
  displayName: 'tv-front',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/tv-front',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'  
  ]
};
