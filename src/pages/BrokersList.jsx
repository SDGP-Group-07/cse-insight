import React from 'react';
import Header from '../components/common/Header';
import MemberBrokers from '../components/Brookers/MemberBrokers';
import TradingBrokers from '../components/Brookers/tradingBrokers';

const BrokersList = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-primary-dark text-white font-sans">
      <Header />
      <main className="relative px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.24),_transparent_58%)]" />
        </div>
        <MemberBrokers />
        <TradingBrokers />
      </main>
    </div>
  );
};

export default BrokersList;
