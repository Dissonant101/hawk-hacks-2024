import { PropsWithChildren } from 'react';
import { Footer } from '../components/Footer';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-screen h-screen text-xl text-white">
      <div className="flex flex-col items-center justify-center bg-pink-200 grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
