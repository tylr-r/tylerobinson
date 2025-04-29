import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  setAnalyticsCollectionEnabled,
  Analytics,
} from 'firebase/analytics';

// Use environment variables provided by Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

/**
 * Initialize Firebase App and Analytics
 */
export const initializeFirebase = () => {
  try {
    if (!app) {
      // Check if all required config values are present
      if (
        !firebaseConfig.apiKey ||
        !firebaseConfig.authDomain ||
        !firebaseConfig.projectId ||
        !firebaseConfig.storageBucket ||
        !firebaseConfig.messagingSenderId ||
        !firebaseConfig.appId
      ) {
        console.error(
          'Firebase config missing. Ensure VITE_FIREBASE_* variables are set in .env',
        );
        return;
      }

      app = initializeApp(firebaseConfig);
      console.log('Firebase App initialized');

      // Initialize Analytics only if measurementId is available
      if (firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
        setAnalyticsCollectionEnabled(analytics, true);
        console.log('Firebase Analytics initialized');
        logPageView();
      } else {
        console.warn('Firebase measurementId not found, Analytics disabled.');
      }
    }
  } catch (e) {
    console.error('Error initializing Firebase:', e);
    app = null;
    analytics = null;
  }
};

/**
 * Log a page view event
 * @param {string} pagePath - Optional path to log, defaults to current path
 */
export const logPageView = (pagePath?: string) => {
  if (!analytics) {
    return;
  }
  try {
    firebaseLogEvent(analytics, 'page_view', {
      page_path: pagePath || window.location.pathname + window.location.search,
    });
  } catch (e) {
    console.error('Error logging page view:', e);
  }
};

/**
 * Log a custom event
 * @param {string} eventName - Name of the event to log
 * @param {object} params - Optional parameters for the event
 */
export const logEvent = (eventName: string, params?: Record<string, any>) => {
  if (!analytics) {
    return;
  }
  try {
    firebaseLogEvent(analytics, eventName, params);
  } catch (e) {
    console.error(`Error logging event ${eventName}:`, e);
  }
};
