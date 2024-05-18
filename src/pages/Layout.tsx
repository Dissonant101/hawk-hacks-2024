import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-screen h-screen text-xl text-white">
      <Header />
      <div className="flex items-center justify-center bg-pink-200 grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
