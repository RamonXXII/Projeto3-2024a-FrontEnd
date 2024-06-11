import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

/* layout */
//import HomeLayout from 'layout/MainLayout';

/* views */
import Home from './views/Home/Home';

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            //<HomeLayout>
              <Home />
            //</HomeLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default Router;
