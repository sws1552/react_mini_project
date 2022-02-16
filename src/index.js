import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import store from "./redux/configureStore";
import axios from "axios";

// 현광님 서버
// axios.defaults.baseURL = "http://14.45.204.153:8023";
// EC2
axios.defaults.baseURL = "http://3.34.137.81:80";
// axios.defaults.baseURL = "http://15.164.165.217:80";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
