import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

/* layout */
//import HomeLayout from 'layout/MainLayout';

/* views */
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/home"
          element={
            //<HomeLayout>
              <Home />
            //</HomeLayout>
          }
        />
        <Route
          path="/"
          element={
            //<HomeLayout>
              <Login />
            //</HomeLayout>
          }
        />
        <Route
          path="/register"
          element={
            //<HomeLayout>
              <Register />
            //</HomeLayout>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

export default Router;
