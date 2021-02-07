import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './containers/EmployeeTable';

function App() {
  return (
    <div className="App">
      <div className="container">
          <EmployeeTable></EmployeeTable>
      </div>
    </div>
  );
}

export default App;
