import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import ProtectedRoute from './routers/ProtectedRouter'
import Authentication from './pages/authentication'
import './index.scss'
import AccountManager from './pages/account/AccountManager'
import store from './service/store'
import ServiceManager from './pages/serviceManager/ServiceManager'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index path="/account_manager" element={<AccountManager />} />
          <Route index path="/service_manager" element={<ServiceManager />} />
        </Route>
        <Route index path="/login" element={<Authentication />} />
        <Route index path="/register" element={<Authentication />} />
      </Routes>
    </Router>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
