import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../layout';
import { Text } from '../ui/atoms/text';
import { Button } from '../ui/atoms/button';
import TrainingPage from './TrainingPage';

const Home: NextPage = () => {
  return (
    <TrainingPage />
  );
};

export default Home;
