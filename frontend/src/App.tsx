import { Card, MantineProvider, Text, createTheme } from '@mantine/core';
import './App.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Card shadow="lg">
        <Text c={'red'}>Hello, Mantine!</Text>
      </Card>
    </MantineProvider>
  );
}

export default App;
