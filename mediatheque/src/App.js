import './App.css';
import Catalog from './Pages/Catalog';
import Login from './Pages/Login';

function App() {
  const isLogged = false;
  return (
    !isLogged ?  
    <Login/>
    :
    <Catalog/>
  );
}

export default App;
