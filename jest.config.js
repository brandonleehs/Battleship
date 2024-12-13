module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',

    // aliases
    '^Ships(.*)$': '<rootDir>/src/model/ships$1',
    '^Model(.*)$': '<rootDir>/src/model$1',
  },
};
