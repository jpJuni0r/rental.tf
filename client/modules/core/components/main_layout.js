import React from 'react';
import Header from '../containers/header';
import Footer from './footer';

const MainLayout = ({content = () => null}) => (
  <main>
    <div className="wrap">
      <Header />
      {content()}
    </div>

    <Footer />
  </main>
);

export default MainLayout;
