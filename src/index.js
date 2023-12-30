
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import ProtectedRoute from './routers/ProtectedRouter';
import Authentication from './pages/authentication';
import "./index.scss"
const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
root.render(
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
          </Route>
          <Route index path="/login" element={<Authentication />} />
          <Route index path="/register" element={<Authentication />} />
        </Routes>
      </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
