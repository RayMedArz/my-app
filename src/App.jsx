import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import Boton from './component/Boton';
import List from './component/List';
import Add from './component/Add';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './component/AppBar';
import CredentialsSignInPae from './component/Login';
import Login from './component/Login';
import Greeting from './component/Greeting';
import Logout from './component/Logout';

// Obtener la URL base de la API desde las variables de entorno
const API_URI = process.env.REACT_APP_API_URI;


function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la página
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    console.log("Autentificación ha cambiado, estado actual: ", isAuthenticated);
    if (isAuthenticated) {
      console.log("Usuario autentificado");
      // Si el usuario está en la página principal o de login, redirigir a /add
      if (window.location.pathname === "/" || window.location.pathname === "/login") {
        navigate("/add");
      }
    } else {
      // Si el usuario no está autenticado y no está en la página principal, redirigir a /
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate]);

  const getItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const startTime = Date.now();
      const result = await fetch(`${API_URI}/items3/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await result.json();
      const endTime = Date.now();
      console.log("Tiempo de respuesta del GET:", endTime - startTime, "ms");
      setItems(data.recordset);
    } catch (error) {
      console.error("Error al obtener items:", error);
    }
  };

  // Agregar las funciones faltantes
  const add = async (item) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URI}/items3/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      
      if (response.ok) {
        // Actualizar la lista de items después de agregar uno nuevo
        getItems();
        alert("Item agregado exitosamente");
      } else {
        alert("Error al agregar el item");
      }
    } catch (error) {
      console.error("Error al agregar item:", error);
      alert("Ocurrió un error al agregar el item");
    }
  };

  const del = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URI}/items3/${itemId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Actualizar la lista de items después de eliminar uno
        getItems();
        alert("Item eliminado exitosamente");
      } else {
        alert("Error al eliminar el item");
      }
    } catch (error) {
      console.error("Error al eliminar item:", error);
      alert("Ocurrió un error al eliminar el item");
    }
  };

  const login = async (user) => {
    try {
      const result = await fetch(`${API_URI}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await result.json();
      console.log("Respuesta completa del servidor:", data);

      // Comprueba si data es un objeto y tiene una propiedad token
      if (data && data.token) {
        // Guardar el token en localStorage
        localStorage.setItem("authToken", data.token);
        
        // Actualizar el estado de autenticación
        setIsAuthenticated(true);
        console.log("Login exitoso");
        return true;
      } else {
        console.log("Falló el login. Respuesta del servidor:", data);
        alert("El login falló");
        return false;
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Ocurrió un error durante el login");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && <ResponsiveAppBar setLogout={logout} />}
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login login={login} /> : <Navigate to="/add" />} />
        <Route path="/add" element={isAuthenticated ? <Add add={add} /> : <Navigate to="/" />} />
        <Route path="/items" element={isAuthenticated ? <List items={items} ondelete={del} /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Navigate to="/add" />} />
        <Route path="/greeting" element={isAuthenticated ? <Greeting /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;