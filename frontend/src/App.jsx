import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react';

function App() {
  
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/clients');
      const body = await response.json();
      setClients(body)
    }

    fetchClients();
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Clientes
          {
            clients.map(client => (
              <>
                <div key={client.id}>{client.name}</div>
              </>
            ))
          }
        </p>
      </header>
    </div>
  );
}

export default App;
