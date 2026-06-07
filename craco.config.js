// const path = require('path');

// module.exports = {
//   webpack: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// };

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    }
  }
};