import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        <AppRoutes />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;