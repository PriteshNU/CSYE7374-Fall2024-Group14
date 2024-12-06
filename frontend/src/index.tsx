import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
import * as serviceWorkerRegistration from "./ServiceWorkerRegistration"

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.ts')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>loading..</div>}>
      <App />
      </Suspense>
      </I18nextProvider>
    </PersistGate>
    
  </Provider>
);
serviceWorkerRegistration.register();
reportWebVitals();
