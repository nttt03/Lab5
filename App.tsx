// App.js
import React from 'react';
// import Router from './src/routers/Router';
import Router from './android/app/src/routers/Router';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
};
export default App;
