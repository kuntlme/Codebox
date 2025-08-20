import dynamic from 'next/dynamic';

export const ClientTerminalComponent = dynamic(
  () => import('./terminal'),
  { 
    ssr: false,
    loading: () => <div>Loading terminal...</div>
  }
);