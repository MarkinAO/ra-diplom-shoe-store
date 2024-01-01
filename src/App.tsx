import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Pages from './processes/routes/Pages';

function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  )
}

export default App;
