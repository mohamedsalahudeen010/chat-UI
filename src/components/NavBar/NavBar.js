import React, { useContext, useEffect, useState } from 'react'
import "./NavBar.css"
        
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import { UilSetting } from '@iconscout/react-unicons'
import { ChatContext } from '../../Context'
function NavBar() {
  const{socket}=useContext(ChatContext)
  const[notifications,setNotification]=useState([])
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    socket?.on("getNotification",(data)=>{
      setNotification((prev)=>[...prev,data])
    })
  },[socket])
  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotification([]);
    setOpen(false);
  };
  return (
    <div
    className='navbar'>
      <span className="logo">Chat</span>
    <div className='icons'>
      <div className='icon' onClick={() => setOpen(!open)}>
        <UilBell/>
        {
notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
      </div>
      <div className='icon'>
        <UilMessage/>
       
      </div>
      <div className='icon'>
        <UilSetting/>
       
      </div>
    </div>
    {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

export default NavBar