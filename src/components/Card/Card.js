import React, { useContext, useState } from 'react'
import "./Card.css"
import { posts } from '../../data';
import RedHeart from "../../images/redHeart.svg";
import Heart from  "../../images/heart.svg";
import Comment from "../../images/comment.svg";
import Info from  "../../images/info.svg";
import Share from "../../images/share.svg";
import { ChatContext } from '../../Context';


function Card({post}) {
  const [liked, setLiked] = useState(false);
  const{socket,setSocket,user,setUser,users,setUsers}=useContext(ChatContext)
  
  const handleNotification = (type) => {
    type === 1 && setLiked(!liked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={RedHeart} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>

  )
}

export default Card