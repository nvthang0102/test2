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
import { GoogleOAuthProvider } from '@react-oauth/google'
import CardManager from './pages/cardManager'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCard from './pages/addCard'
import Landing from './pages/Landing'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<GoogleOAuthProvider clientId={`${window.GOOGLE_ID_CLIENT}`}>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index path="/account_manager" element={<AccountManager />} />
          <Route index path="/service_manager" element={<ServiceManager />} />
          <Route index path="/card-manager" element={<CardManager />} />
          <Route index path="/add-card" element={<AddCard />} />
        </Route>
        <Route index path="/login" element={<Authentication />} />
        <Route index path="/register" element={<Authentication />} />
      </Routes>
    </Router>
  </Provider>
</GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
