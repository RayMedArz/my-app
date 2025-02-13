import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import Boton from './component/Boton';
import List from './component/List';
import Add from './component/Add';

function App() {
  const items=[{id:1, name:'item1',price:1},{id:2, name:'item2',price:2},{id:3, name:'item3',price:3}];
  const [count, setCount] =useState(0);
  const sum=() =>{
    setCount(count+1);
    console.log(count)
  }
  const resta=() =>{
    setCount(count-1);
    console.log(count)
  }
  const nombre = "Ray";
  const elemento= <h1>Hola, {nombre}</h1>;
  const add = (item) =>{
    items.id=items.length+1;
    items.push(item);
  }
  return (
    <div className="App">
      <Header/>
      {count}
      <Boton name={'suma'} click={sum}/>
      <Boton name={'resta'} click={resta}/>
      <Boton name={'mensaje'} click= {()=>alert("hola")} />
      <Add add={add} />
      <List items={items}/>
      <Footer/>
    </div>
  );
}

export default App;
