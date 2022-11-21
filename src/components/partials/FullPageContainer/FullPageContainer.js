import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import PageContainerWithAside from '../PageContainerWithAside/PageContainerWithAside.js';
import Navigation from './../Navigation/index.jsx';

import './full-page-container.scss';

export default function FullPageContainer({ children }) {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <PageContainerWithAside>
      <div className="page-container ">
        <Navigation theme="light" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          className="page-body"
        >
          {children}
        </motion.div>
      </div>
    </PageContainerWithAside>
  );
}
