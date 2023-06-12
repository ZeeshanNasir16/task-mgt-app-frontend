import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import 'simplebar/src/simplebar.css';
import 'react-toastify/dist/ReactToastify.css';

import store from 'store';

ReactDOM.render(
  <StoreProvider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </HelmetProvider>
  </StoreProvider>,
  document.getElementById('root')
);
