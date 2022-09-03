import './App.css';
import { Toaster } from 'react-hot-toast';
import Table from './components/Table/Table';
import { UserProvider } from './context/user-context';

function App() {
  return (
    <div className="App">
      <Toaster />
      <h1 className="heading">Users</h1>
      <section className="users-data">
        <UserProvider>
          <Table />
        </UserProvider>
      </section>
    </div>
  );
}

export default App;
