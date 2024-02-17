import React, { useContext, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Card from '../../components/Card/Card'
import { ChatContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import "./Chat.css"
import { posts } from '../../data'
function Chat() {
  const{socket,setSocket,user,setUser,users,setUsers}=useContext(ChatContext)
    const navigate=useNavigate()
 
  return (
    <div className='chatPage'>
        
    <NavBar  socket={socket}/>
    {posts.map((post) => (
            <Card key={post.id} post={post}  user={user}  socket={socket}/>
          ))}
    <span className='userName'>{user}</span>
    </div>
  )
}

export default Chat