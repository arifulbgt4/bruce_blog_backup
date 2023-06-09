import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './state/store';

const Container = () => {
  const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Container />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
