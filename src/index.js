import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Insects from './pages/Insects';
import Insect from './pages/Insect';
import UserInsects from './pages/userInsect';
import MyAccount from './pages/Account';
import Admin from './pages/Admin';
import NoPage from './pages/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="insects" element={<Insects />} />
          <Route path="insect/:id" element={<Insect />} />
          <Route path="myinsects" element={<UserInsects />} />
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
