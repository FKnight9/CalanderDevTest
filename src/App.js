import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Layout />
        </div>
      </Provider>
    );
  }
}

export default App;