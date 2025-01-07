import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Content
          title="A better way to enjoy every day."
          subtitle="Be the first to know when we launch."
          buttonText="Request an invite"
        />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
