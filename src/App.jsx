//rafce
import React from 'react'
import AppRoustes from './routes/AppRoustes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer />
    <AppRoustes />
    </>
  )
}

export default App