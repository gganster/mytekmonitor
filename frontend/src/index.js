import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import useHydrogen from "./hydrogen/core/init";
import Router from "./hydrogen/core/Router";
import { ToastContainer } from 'react-toastify';
import { Provider as UIProvider } from "./contexts/ui";
import { Provider as InstanceProvider } from "./contexts/instance";

const App = () => {
  useHydrogen(); //do not remove this line

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false}
                      theme="colored" />
      <UIProvider>
        <InstanceProvider>
          <Router />
        </InstanceProvider>
      </UIProvider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();
