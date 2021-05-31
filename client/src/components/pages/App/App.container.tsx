import React from 'react';  
import { SnackbarProvider } from 'notistack';
import { AuthenticationProvider } from '../../../stores/Authentication';

import App from './App';

export default function AppContainer(): JSX.Element {
  return (
    <AuthenticationProvider>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <App />
      </SnackbarProvider>
    </AuthenticationProvider>
  );
}
