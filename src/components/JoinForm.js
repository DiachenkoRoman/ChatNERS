import React, {useState} from "react";
import axios from "axios";

const JoinForm = ({onLogin}) =>{

    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () =>{
        if (!roomId || !userName){
            return alert("Bad input")
        };
        const obj = {
            roomId,
            userName
        };
        setLoading(true);
        await axios.post("/rooms", obj);
        onLogin(obj);
    }

    return(
    <div className="joinForm">
        <label htmlFor="chatID">Chat ID</label>
        <input type="text" id="chatID" value={roomId} onChange={(event) => setRoomId(event.target.value)}/>
        <label htmlFor="chatNick">Your nickname</label>
        <input type="text" id="chatNick" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        <button disabled={isLoading} onClick={onEnter}>{isLoading ? "Вход..." : "Войти"}</button>
    </div>
    )
}

export default JoinForm
