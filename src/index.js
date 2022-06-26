import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';
// Import Redux
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import store from 'redux/storeConfig/store'
import App from 'App';
import 'material-react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);