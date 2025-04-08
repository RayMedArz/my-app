import { Box, Button, TextField } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ({login}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onsubmit = (e) => { e.preventDefault();
        if (!email || !password) {
            alert("los campos no deben estar vacios");
            return;
        }
        const isLogin = login({ email, password });
        if (isLogin) {
            setEmail("");
            setPassword("");
            alert("El login fue exitoso");
        }else{
            alert("El login fallo");
        };
        setEmail("");
        setPassword("");
    }
  return (
    <form onSubmit={onsubmit}>
      <Box
        margin={"auto"}
        flexDirection={"column"}
        display={"flex"}
        width={400}
        marginTop={"20px"}
      >
        <TextField label={"email"} value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <TextField type={"password"} label={"Password"} value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button type={"submit"} variant="contained">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default Login;
