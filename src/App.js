import React, {useEffect, useReducer} from 'react';
import axios from "axios";
import JoinForm from "./components/JoinForm";
import Room from "./components/Room";
import reducer from "./components/reducer";
import socket from "./socket";
import "./index.css";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async (obj) =>{
        dispatch({
            type: "JOINED",
            payload: obj
        });
        socket.emit("ROOM:JOIN", obj);
        const { data } = await axios.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: "SET_DATA",
            payload: data
        });
    };

    const setUsers = (users) =>{
        dispatch({
            type: "SET_USERS",
            payload: users
        });
    };

    const addMessage = (message) =>{
        dispatch({
            type: "NEW_MESSAGE",
            payload: message
        });
    };

    useEffect(()=>{
        socket.on("ROOM:SET_USERS", setUsers);
        socket.on("ROOM:NEW_MESSAGE", addMessage);

        }, []);

  return (
    <div className="App">
        {!state.joined ? <JoinForm onLogin={onLogin}/> : <Room {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
