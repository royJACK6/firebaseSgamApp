import React from 'react';
import HeroSection from '../shared/HeroSection';
import HomeServices from '../shared/HomeServices';
import Tabs from '../shared/Tabs';
import BottomNav from '../shared/BottomNav';

function Home() {
  return (
    <main className="home-page">
      <HeroSection />
      <BottomNav />
      <HomeServices />
      <Tabs />
    </main>
  );
}

export default Home;
