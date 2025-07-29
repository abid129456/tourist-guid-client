// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import AuthProvider from './contexts/AuthContext'

// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </AuthProvider>
//   </React.StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './contexts/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
// import { router } from './routes/router'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
