import React from 'react';
import Header from '../containers/header';

const MainLayout = ({content = () => null}) => (
  <main>
    <Header />

    {content()}
  </main>
);

export default MainLayout;
