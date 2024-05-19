import { PropsWithChildren } from 'react';
import { Footer } from '../components/Footer';
import { Container } from '@mui/material';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-screen h-screen text-xl text-white gradient-animation">
      <Container
        className="flex flex-col items-center justify-center grow"
        maxWidth="sm"
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
}
