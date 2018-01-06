import Rollbar from 'rollbar';

// Track error by https://sentry.io/
// if (location.host === 'preview.pro.ant.design') {
//   Rollbar.init({
//     accessToken: '033ca6d7c0eb4cc1831cf470c2649971',
//     captureUncaught: true,
//     captureUnhandledRejections: true,
//     payload: {
//       environment: 'production',
//     },
//   });
// }

// Track error by https://sentry.io/
// hequnmin@gmail.com
Rollbar.init({
  accessToken: '287e78bef05711e781fd4201c0a8d032',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'development',
  },
});
