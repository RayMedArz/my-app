import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
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

function App() {
  const [items,setItems] =useState([{id:1, name:'item1',price:1},{id:2, name:'item2',price:2},{id:3, name:'item3',price:3}]);
  const [count, setCount] =useState(0);

  const [isLogin, setIsLogin] = useState(false);
  const sum=() =>{
    setCount(count+1);
    console.log(count)
  }
  const resta=() =>{
    setCount(count-1);
    console.log(count)
  }
  const add = (item) => {
    item.id = items.length + 1;
    setItems([...items, item]);
  };
  const del = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const login=(user)=>{
    if (user.username==="Ray" && user.password==="123"){
      setIsLogin(true);
    }
    return isLogin;
  };

  const setLogout = () => {
    setIsLogin(false);
  }; 

  return (
    <div className="App">
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar setLogout={setLogout}/>}
          <Routes>  
            <Route path= "/" element={ <Login login={login}/>}/>
            <Route path="/add" element={<Add add={add} />} />
            <Route
            path="/items"
            element={<List items={items} ondelete={del} />}
          />
          <Route path="/greeting" element={<Greeting/>} />

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
