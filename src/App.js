import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './containers/EmployeeTable';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Employee Directory</a>
        </div>
      </nav>
      <div className="container">
          <EmployeeTable></EmployeeTable>
      </div>
    </div>
  );
}

export default App;
