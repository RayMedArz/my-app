import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import Boton from './component/Boton';
import List from './component/List';
import Add from './component/Add';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './component/AppBar';
import CredentialsSignInPae from './component/Login';
import Login from './component/Login';
import Greeting from './component/Greeting';
import Logout from './component/logout';

function App() {
  console.log('App component is running');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(()=> {
    console.log("Autentificación ha cambiado, estado actual: ", isAuthenticated);
    if(isAuthenticated){
      console.log("Usuario autentificado");
    }
  },[isAuthenticated]);

  const getItems = async () => {
    try {
      const startTime = Date.now();
      const result = await fetch("http://localhost:5000/items/", { method: "GET" });
      const data = await result.json();
      const endTime = Date.now();
      console.log("Tiempo de respuesta del GET:", endTime - startTime, "ms");
      setItems(data.recordset);
    } catch (error) {
      console.error("Error al obtener items:", error);
    }
  };

  let [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const add = async (item) => {
    const result = await fetch("http://localhost:5000/items/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    const newItem = await result.json();
    console.log(newItem);
    if (result.ok) {
      setItems([...items, newItem]);
    } else {
      console.error('Error adding item:', newItem);
    }
  };
  
  

  const del = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
      if (response.ok) {
        setItems(items.filter((item) => item.item_id !== id)); 
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const login = async (user) => {
    const result = await fetch("http://localhost:5000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    const data = await result.json();
    console.log(data);
    setIsAuthenticated(data.isLogin);
    console.log(data.isLogin) 
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar setLogout={setLogout}/>}
          <Routes>  
            <Route path= "/" element={ <Login login={login}/>}/>
            <Route path="/add" element={<Add add={add} />} />
            <Route path="/items" element={<List items={items} ondelete={del} />}/>
            <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Greeting />} />


        </Routes>
      {/* {count}
      <Boton name={'suma'} click={sum}/>
      <Boton name={'resta'} click={resta}/>
      <Boton name={'mensaje'} click= {()=>alert("hola")} />
      <Add add={add} />
      <List items={items}/> */}
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
