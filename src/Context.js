
import React, { createContext, useState } from 'react'
export const ChatContext=createContext(null)


function Context(props) {
  const[socket,setSocket]=useState(null)
    const [user, setUser] = useState("");
   
   return (
    <ChatContext.Provider value={{socket,setSocket,user,setUser}}>
        {props.children}
    </ChatContext.Provider>
  )
}

export default Context
