export const config = {
  server_url: import.meta.env.VITE_APP_SERVER_URL,
  client_url: import.meta.env.VITE_APP_CLIENT_URL,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  stripe: {
    payment_gateway_key: import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
