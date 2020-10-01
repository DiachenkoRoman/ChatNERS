import React, {useEffect, useRef, useState} from "react";
import socket from "../socket";
import "../styles/room.css"


const Room = ({users, messages, userName, roomId, onAddMessage}) =>{
    const [messageValue, setMessageValue] = useState("");
    const messagesRef = useRef(null);

    const onSendMessage = () => {
        socket.emit("ROOM:NEW_MESSAGE", {
            userName,
            roomId,
            text: messageValue,
        })
        onAddMessage({userName, text: messageValue});
        setMessageValue("");
    }

    useEffect(() =>{
        messagesRef.current.scrollTo(0, 9999999);
    }, [messages])

   return(
       <div className="room">

           <div className="room__users">
               <h1>Room: {roomId}</h1>
                <h3 className="room__users_inside">Users ({users.length}):</h3>

               <ul className="room__users_list">
                   {users.map((name, index) => {
                       return <li key={name+index}>{name}</li>
                   })}
               </ul>
           </div>

           <div className="room__chat">
                <div ref={messagesRef} className="room__chat_messages">
                    {messages.map((elem, index) =>{
                        return <div key={elem + index} className={userName === elem.userName ? "message_my" : "message"}>
                                    <p className="message__body">{elem.text}</p>
                                    <p className="message__sender">{elem.userName}</p>
                                </div>
                    })}
                </div>

               <div className="room__chat_form">
                   <textarea onChange={(event) => setMessageValue(event.target.value)} value={messageValue}/>
                   <button onClick={onSendMessage}>Send</button>
               </div>

           </div>
       </div>
   )
}

export default Room
