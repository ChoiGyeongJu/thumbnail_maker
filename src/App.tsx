import { WebRouter } from 'routes';

import TanstackQueryProvider from '$contexts/TanstackQueryProvider';

import './App.css';

function App() {
  return (
    <TanstackQueryProvider>
      <WebRouter />
    </TanstackQueryProvider>
  );
}

export default App;
