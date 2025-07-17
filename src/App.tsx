import React from 'react';
import Hero from './components/Hero';
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <ApiProvider>
      <div className="min-h-screen bg-gray-900 overflow-x-hidden">
        <Hero />
      </div>
    </ApiProvider>
  );
}

export default App;