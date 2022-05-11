const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
};
