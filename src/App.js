import './App.css';
import { Route, Routes } from 'react-router-dom';
import LogInPage from './pages/login/LoginPage';
import SignUpPage from './pages/signUp/SignUp';
import Chat from './pages/Chat/Chat';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from './Context';
import { io } from "socket.io-client";

function App() {
  
  const{socket,setSocket,user,setUser}=useContext(ChatContext)
  const[name,setName]=useState("")
  useEffect(()=>{
    console.log(name)
    setSocket(io("https://chat-socket-jzzd.onrender.com")) 
    setUser(name)
  },[])
  useEffect(()=>{
    socket?.emit("newUser",user)
  },[socket,user])
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LogInPage setName={setName}/>}/>
        <Route  path="/signUp" element={<SignUpPage/>}/>
        <Route  path="/chat" element={<Chat 
        socket={socket}/>}/>
        
        
      </Routes>
    </div>
  );
}

export default App;
