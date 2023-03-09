import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ClientSelect from "./Components/ClientSelect";
// import Cart from "./Components/Cart";
import Dashboard from "./Components/Dashboard";
import Login from './Components/Login';
import MainLayout from "./Components/MainLayout";
import Sku from "./Components/Sku";
// import Products from "./Components/Products";
import User from "./Components/User";
import SelectClient from "./SelectClient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/clientSelect' element={<ClientSelect />} />
        <Route path="/admin" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='SelectClient' element={<SelectClient />} />
          
          <Route path='Sku' element={<Sku />} />
          <Route path='User' element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
