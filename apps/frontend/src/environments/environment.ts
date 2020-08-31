// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDJHb20LD0faqRQP4O7aXjWt7XU1UpiJIc',
    authDomain: 'giflib-33608.firebaseapp.com',
    databaseURL: 'https://giflib-33608.firebaseio.com',
    projectId: 'giflib-33608',
    storageBucket: 'giflib-33608.appspot.com',
    messagingSenderId: '847829462607'
  },
  auth_firebaseui: {
    enableFirestoreSync: true, // enable/disable autosync users with firestore
    toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
    toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
    authGuardFallbackURL: '/signIn', // url for unauthenticated users - to use in combination with canActivate feature on a route
    authGuardLoggedInURL: '/search', // url for authenticated users - to use in combination with canActivate feature on a route
    passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
    passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
    // Same as password but for the name
    nameMaxLength: 50,
    nameMinLength: 2,
    // If set, sign-in/up form is not available until email has been verified.
    // Plus protected routes are still protected even though user is connected.
    guardProtectedRoutesUntilEmailIsVerified: true,
    enableEmailVerification: true, // default: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
