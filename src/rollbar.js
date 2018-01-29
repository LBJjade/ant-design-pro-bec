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
// Google Login rollbar.com
// hequnmin@gmail.com
Rollbar.init({
  accessToken: 'bb4a03e69377488c9b34ed08b5905c53',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'development',
  },
});
