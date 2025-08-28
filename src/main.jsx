import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './contexts/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HashRouter } from 'react-router-dom';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
