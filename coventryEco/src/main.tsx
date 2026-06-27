import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';

// connect to AWS Cognito
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_Tl9Y95Jda",
      userPoolClientId: "6ss73u77f81vl0t17hqhra9v6k",
    }
  }
});

// render the app
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);