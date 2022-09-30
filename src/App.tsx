import React from 'react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import { Particles } from './components/Particles';
import { BarChart } from './components/BarChart';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

// Solution from https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const calcVh = () => {
  (document.querySelector(':root') as any).style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

calcVh();
window.addEventListener('resize', () => {
  calcVh();
});

const App: React.FC = () => (
  <CacheProvider value={muiCache}>
    <ThemeProvider theme={theme}>
      {/* <Particles /> */}
      <BarChart />
    </ThemeProvider>
  </CacheProvider>
);

export default App;
