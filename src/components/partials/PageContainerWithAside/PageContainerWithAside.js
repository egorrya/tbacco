import React from 'react';
import Footer from '../Footer/index.jsx';
import './page-container-with-aside.scss';

export default function PageContainerWithAside({ children }) {
  return (
    <div className="content">
      <main className="main-page-area">{children}</main>

      <Footer />
    </div>
  );
}
