import './style.css';
import SignInPage from './components/login-page/SignInPage.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Main /> */}
      <BrowserRouter>
        <SignInPage />
        {/* <Dashboard /> */}
      </BrowserRouter>
      {/* <Navbar /> */}

      {/* <LoginPage /> */}
      {/* <Header /> */}
      {/* <Navbar /> */}
      {/* <DisplayPage title="Dashboard" descprition="welcome to Dashboard" /> */}
      {/* <DisplayPage title="Product MANAGEMENT" descprition="Add or list the product as per your needs" add="Add Product" list="List Product" /> */}
      {/* <DisplayPage title="CLIENT MANAGEMENT" descprition="Add or list the client as per your needs" add="Add Client" list="List Client" /> */}
      {/* <DisplayPage title="Vendor MANAGEMENT" descprition="Add or list the Vendor as per your needs" add="Add Vendor" list="List Vendor" /> */}

      {/* <Dashboard /> */}
    </>
  );
}
export default App;