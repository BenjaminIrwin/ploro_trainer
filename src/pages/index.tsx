import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../layout';
import Checkout from '../components/Checkout';

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
    <Checkout />
      </Layout>
    </div>
  );
};

export default Home;
