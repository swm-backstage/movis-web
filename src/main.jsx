import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './globalStyle.js'
import { Reset } from 'styled-reset'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Reset />
    <GlobalStyle />
    <RouterProvider router={router}/>
  </>,
)
